'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { useCallback as useStableCallback } from 'react';
import type { Node, Edge } from '@xyflow/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface UseGraphLayoutOptions {
    setNodes: (updater: (nodes: Node[]) => Node[]) => void;
    setEdges: (updater: (edges: Edge[]) => Edge[]) => void;
    setLoadedCount: (updater: (n: number) => number) => void;
    onSelectRef: React.MutableRefObject<((id: string) => void) | undefined>;
}

export function useGraphLayout({ setNodes, setEdges, setLoadedCount, onSelectRef }: UseGraphLayoutOptions) {
    const fetchingIds = useRef<Set<string>>(new Set());
    const handleLazyLoadRef = useRef<((nodeId: string) => Promise<void>) | undefined>(undefined);
    const placedPositions = useRef<Map<string, { x: number; y: number }>>(new Map());

    const mergeDataIntoGraph = useCallback((newData: any, anchorId: string | null) => {
        setNodes(currNodes => {
            const existingById = new Map(currNodes.map(n => [n.id, n]));
            const newInds: any[] = newData.individuals || [];
            const newFamilies: any[] = newData.families || [];
            const newFC: any[] = newData.family_children || [];

            const childrenByFamily = new Map<string, string[]>();
            const familyByChild = new Map<string, string[]>();
            newFC.forEach((fc: any) => {
                if (!childrenByFamily.has(fc.family_id)) childrenByFamily.set(fc.family_id, []);
                childrenByFamily.get(fc.family_id)!.push(fc.child_id);
                if (!familyByChild.has(fc.child_id)) familyByChild.set(fc.child_id, []);
                familyByChild.get(fc.child_id)!.push(fc.family_id);
            });

            const familiesBySpouse = new Map<string, any[]>();
            newFamilies.forEach((f: any) => {
                [f.husband_id, f.wife_id].forEach(sid => {
                    if (sid) {
                        if (!familiesBySpouse.has(sid)) familiesBySpouse.set(sid, []);
                        familiesBySpouse.get(sid)!.push(f);
                    }
                });
            });

            const brandNewIndIds = new Set(newInds.map((i: any) => i.id).filter((id: string) => !existingById.has(id)));

            const anchorPos = anchorId
                ? (placedPositions.current.get(anchorId) || existingById.get(anchorId)?.position || { x: 0, y: 0 })
                : { x: 0, y: 0 };

            const levels = new Map<string, number>();
            const startId = anchorId || newData.startPersonId || newInds[0]?.id;
            if (startId) {
                const queue: { id: string; level: number }[] = [{ id: startId, level: 0 }];
                levels.set(startId, 0);
                let head = 0;
                while (head < queue.length) {
                    const { id, level } = queue[head++];

                    (familyByChild.get(id) || []).forEach((fId: string) => {
                        const fam = newFamilies.find((f: any) => f.id === fId);
                        if (fam) {
                            [fam.husband_id, fam.wife_id].forEach((pid: string) => {
                                if (pid && !levels.has(pid)) {
                                    levels.set(pid, level - 1);
                                    queue.push({ id: pid, level: level - 1 });
                                }
                            });
                        }
                    });

                    (familiesBySpouse.get(id) || []).forEach((fam: any) => {
                        const partnerId = fam.husband_id === id ? fam.wife_id : fam.husband_id;
                        if (partnerId && !levels.has(partnerId)) {
                            levels.set(partnerId, level);
                            queue.push({ id: partnerId, level });
                        }
                        (childrenByFamily.get(fam.id) || []).forEach((cId: string) => {
                            if (!levels.has(cId)) {
                                levels.set(cId, level + 1);
                                queue.push({ id: cId, level: level + 1 });
                            }
                        });
                    });
                }
            }

            const newLevelGroups = new Map<number, string[]>();
            brandNewIndIds.forEach(id => {
                const lvl = levels.get(id) ?? 0;
                if (!newLevelGroups.has(lvl)) newLevelGroups.set(lvl, []);
                newLevelGroups.get(lvl)!.push(id);
            });

            const occupiedXByY = new Map<number, number[]>();
            placedPositions.current.forEach(pos => {
                const yBucket = Math.round(pos.y / 260);
                if (!occupiedXByY.has(yBucket)) occupiedXByY.set(yBucket, []);
                occupiedXByY.get(yBucket)!.push(pos.x);
            });

            const findFreeX = (yBucket: number, startX: number): number => {
                const taken = new Set(occupiedXByY.get(yBucket) || []);
                let x = startX;
                while ([...taken].some(tx => Math.abs(tx - x) < 300)) x += 300;
                if (!occupiedXByY.has(yBucket)) occupiedXByY.set(yBucket, []);
                occupiedXByY.get(yBucket)!.push(x);
                return x;
            };

            const sortedLevels = Array.from(newLevelGroups.keys()).sort((a, b) => a - b);
            sortedLevels.forEach(lvl => {
                const nodesHere = newLevelGroups.get(lvl)!;
                const absY = anchorPos.y + lvl * 260;
                const yBucket = Math.round(absY / 260);
                const placed = new Set<string>();
                let currentX = anchorPos.x - (nodesHere.length * 300) / 2;

                const placeNode = (id: string) => {
                    if (placed.has(id) || placedPositions.current.has(id)) return;
                    const freeX = findFreeX(yBucket, currentX);
                    placedPositions.current.set(id, { x: freeX, y: absY });
                    placed.add(id);
                    currentX = freeX + 300;
                };

                // Place spouse pairs together first for horizontal clustering
                newFamilies.forEach((fam: any) => {
                    const hId = fam.husband_id;
                    const wId = fam.wife_id;
                    if (hId && wId && nodesHere.includes(hId) && nodesHere.includes(wId)) {
                        placeNode(hId);
                        placeNode(wId);
                    }
                });

                nodesHere.filter(id => !placed.has(id)).forEach(placeNode);
            });

            const buildNodeData = (ind: any, nodeId: string, isRootNode: boolean) => ({
                ...ind,
                label: `${ind.given_names || ''} ${ind.surname || ''}`.trim() || 'Unknown',
                rawId: ind.raw_metadata?.GEDCOM_ID || nodeId,
                gender: ind.raw_metadata?.SEX || 'U',
                birthYear: ind.birth_year_calculated || null,
                expandable: nodeId !== anchorId,
                isRoot: isRootNode,
                onExpand: (id: string) => handleLazyLoadRef.current?.(id),
                onSelect: (id: string) => onSelectRef.current?.(id),
            });

            const resultNodes: Node[] = currNodes.map(n => {
                const ind = newInds.find((i: any) => i.id === n.id);
                if (!ind) return n;
                return {
                    ...n,
                    data: buildNodeData(ind, n.id, Boolean(n.data.isRoot)),
                };
            });

            brandNewIndIds.forEach(id => {
                const ind = newInds.find((i: any) => i.id === id)!;
                resultNodes.push({
                    id,
                    type: 'personNode',
                    position: placedPositions.current.get(id) || { x: 0, y: 0 },
                    data: buildNodeData(ind, id, id === newData.startPersonId && !anchorId),
                });
            });

            setLoadedCount(() => resultNodes.filter(n => n.type === 'personNode').length);
            return resultNodes;
        });

        setEdges(currEdges => {
            const edgeMap = new Set(currEdges.map(e => e.id));
            const toAdd: Edge[] = [...currEdges];

            const addEdge = (eId: string, src: string, tgt: string, sHandle: string, tHandle: string, color: string, dash?: string) => {
                if (edgeMap.has(eId)) return;
                toAdd.push({
                    id: eId,
                    source: src,
                    target: tgt,
                    sourceHandle: sHandle,
                    targetHandle: tHandle,
                    type: 'step',
                    style: {
                        stroke: color,
                        strokeWidth: dash ? 1.8 : 2,
                        strokeDasharray: dash,
                    },
                });
                edgeMap.add(eId);
            };

            // Marriage edges: dashed rose line (married-in)
            newData.families?.forEach((fam: any) => {
                if (fam.husband_id && fam.wife_id) {
                    addEdge(`e_m_${fam.id}`, fam.husband_id, fam.wife_id, 'right-s', 'left', '#f43f5e', '6,4');
                }
            });

            // Bloodline edges: solid heavier slate line
            newData.family_children?.forEach((fc: any) => {
                const fam = newData.families?.find((f: any) => f.id === fc.family_id);
                const parentId = fam?.husband_id || fam?.wife_id;
                if (parentId) {
                    addEdge(`e_${parentId}_${fc.child_id}`, parentId, fc.child_id, 'bottom-s', 'top', '#475569');
                }
            });

            return toAdd;
        });
    }, [setNodes, setEdges, setLoadedCount, onSelectRef]);

    const handleLazyLoad = useCallback(async (nodeId: string) => {
        if (fetchingIds.current.has(nodeId)) return;
        fetchingIds.current.add(nodeId);

        try {
            const res = await fetch(`${API_URL}/canvas/data?person=${nodeId}&type=expand`);
            if (!res.ok) {
                const body = await res.text();
                throw new Error(`Fetch failed ${res.status}: ${body}`);
            }
            const data = await res.json();
            mergeDataIntoGraph(data, nodeId);
        } catch (err) {
            console.error('Lazy load failed:', err);
            throw err;
        } finally {
            fetchingIds.current.delete(nodeId);
        }
    }, [mergeDataIntoGraph]);

    useEffect(() => {
        handleLazyLoadRef.current = handleLazyLoad;
    }, [handleLazyLoad]);

    return { mergeDataIntoGraph, handleLazyLoad, placedPositions };
}
