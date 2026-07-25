'use client';

import { useEffect, useRef, useCallback } from 'react';
import type { Node, Edge } from '@xyflow/react';
import ELK from 'elkjs/lib/elk.bundled.js';

const elk = new ELK();

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const CARD_WIDTH = 180;
const CARD_HEIGHT = 190;
const FAMILY_NODE_SIZE = 16;

interface UseGraphLayoutOptions {
    setNodes: (updater: Node[] | ((nodes: Node[]) => Node[])) => void;
    setEdges: (updater: Edge[] | ((edges: Edge[]) => Edge[])) => void;
    getNodes: () => Node[];
    getEdges: () => Edge[];
    setLoadedCount: (updater: (n: number) => number) => void;
    onSelectRef: React.MutableRefObject<((id: string) => void) | undefined>;
}

export function useGraphLayout({ setNodes, setEdges, getNodes, getEdges, setLoadedCount, onSelectRef }: UseGraphLayoutOptions) {
    const fetchingIds = useRef<Set<string>>(new Set());
    const handleLazyLoadRef = useRef<((nodeId: string) => Promise<void>) | undefined>(undefined);

    const mergeDataIntoGraph = useCallback(async (newData: any, anchorId: string | null) => {
        const currNodes = getNodes();
        const currEdges = getEdges();

        const existingById = new Map(currNodes.map(n => [n.id, n]));
        const edgeMap = new Set(currEdges.map(e => e.id));

        const newInds: any[] = newData.individuals || [];
        const newFamilies: any[] = newData.families || [];
        // const newFC: any[] = newData.family_children || [];

        const brandNewIndIds = new Set(newInds.map((i: any) => i.id).filter((id: string) => !existingById.has(id)));

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

        // Update existing nodes with new data if needed
        const resultNodes: Node[] = currNodes.map(n => {
            const ind = newInds.find((i: any) => i.id === n.id);
            if (!ind) return n;
            return {
                ...n,
                data: buildNodeData(ind, n.id, Boolean(n.data.isRoot)),
            };
        });

        // Add new person nodes
        brandNewIndIds.forEach(id => {
            const ind = newInds.find((i: any) => i.id === id)!;
            resultNodes.push({
                id,
                type: 'personNode',
                position: { x: 0, y: 0 }, // Elk will calculate this
                data: buildNodeData(ind, id, id === newData.startPersonId && !anchorId),
            });
        });

        // Add new family nodes
        const familyNodesToAdd: Node[] = [];
        newFamilies.forEach((fam: any) => {
            const fId = `fam_${fam.id}`;
            if (!existingById.has(fId)) {
                familyNodesToAdd.push({
                    id: fId,
                    type: 'familyNode',
                    position: { x: 0, y: 0 }, // Elk will calculate this
                    data: {},
                    draggable: true,
                });
            }
        });
        resultNodes.push(...familyNodesToAdd);

        const resultEdges: Edge[] = [...currEdges];

        const addEdge = (eId: string, src: string, tgt: string, sHandle: string, tHandle: string, color: string, dash?: string) => {
            if (edgeMap.has(eId)) return;
            resultEdges.push({
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

        newData.families?.forEach((fam: any) => {
            const fId = `fam_${fam.id}`;
            if (fam.husband_id) {
                addEdge(`e_h_${fam.id}`, fam.husband_id, fId, 'right-s', 'left', '#f43f5e', '6,4');
            }
            if (fam.wife_id) {
                addEdge(`e_w_${fam.id}`, fam.wife_id, fId, 'left-s', 'right', '#f43f5e', '6,4');
            }
        });

        newData.family_children?.forEach((fc: any) => {
            const fId = `fam_${fc.family_id}`;
            addEdge(`e_fc_${fc.family_id}_${fc.child_id}`, fId, fc.child_id, 'bottom-s', 'top', '#475569');
        });

        // --- Calculate Depths via BFS for ELK partitioning ---
        const depthMap = new Map<string, number>();
        currNodes.forEach(n => {
            if (n.data && typeof n.data.depth === 'number') {
                depthMap.set(n.id, n.data.depth);
            }
        });

        const adj = new Map<string, { neighbor: string, diff: number }[]>();
        const addAdj = (u: string, v: string, diff: number) => {
            if (!adj.has(u)) adj.set(u, []);
            adj.get(u)!.push({ neighbor: v, diff });
        };

        resultEdges.forEach(e => {
            if (e.id.startsWith('e_h_') || e.id.startsWith('e_w_')) {
                // spouse to family: same generation
                addAdj(e.source, e.target, 0);
                addAdj(e.target, e.source, 0);
            } else if (e.id.startsWith('e_fc_')) {
                // family to child: child is next generation
                addAdj(e.source, e.target, 1);
                addAdj(e.target, e.source, -1);
            }
        });

        const queue: string[] = [];
        if (depthMap.size === 0) {
            const startId = newData.startPersonId || (resultNodes.length > 0 ? resultNodes[0].id : null);
            if (startId) {
                depthMap.set(startId, 0);
                queue.push(startId);
            }
        } else {
            for (const id of depthMap.keys()) {
                queue.push(id);
            }
        }

        let qIdx = 0;
        while (qIdx < queue.length) {
            const u = queue[qIdx++];
            const currDepth = depthMap.get(u)!;
            const neighbors = adj.get(u) || [];
            for (const edge of neighbors) {
                if (!depthMap.has(edge.neighbor)) {
                    depthMap.set(edge.neighbor, currDepth + edge.diff);
                    queue.push(edge.neighbor);
                }
            }
        }

        for (let i = 0; i < resultNodes.length; i++) {
            const n = resultNodes[i];
            const d = depthMap.get(n.id) || 0;
            resultNodes[i] = {
                ...n,
                data: {
                    ...(n.data || {}),
                    depth: d
                }
            };
        }

        // Run ELK layout
        const elkNodes = resultNodes.map(n => ({
            id: n.id,
            width: n.type === 'familyNode' ? FAMILY_NODE_SIZE : CARD_WIDTH,
            height: n.type === 'familyNode' ? FAMILY_NODE_SIZE : CARD_HEIGHT,
            layoutOptions: {
                'partitioning.partition': String(n.data?.depth || 0),
            }
        }));

        const elkEdges = resultEdges.map(e => {
            const isSpouseEdge = e.id.startsWith('e_h_') || e.id.startsWith('e_w_');
            return {
                id: e.id,
                sources: [e.source],
                targets: [e.target],
                layoutOptions: isSpouseEdge
                    ? {
                          'elk.layered.priority.straightness': '100',
                          'elk.priority': '100',
                      }
                    : {
                          'elk.layered.priority.straightness': '1',
                          'elk.priority': '1',
                      }
            };
        });

        const graph = {
            id: 'root',
            layoutOptions: {
                'elk.algorithm': 'layered',
                'elk.direction': 'DOWN',
                'elk.edgeRouting': 'ORTHOGONAL',
                'elk.layered.edgeRouting': 'ORTHOGONAL',
                'elk.layered.mergeEdges': 'true',
                'elk.layered.spacing.nodeNodeBetweenLayers': '100',
                'elk.layered.spacing.nodeNode': '50',
                'elk.partitioning.activate': 'true',
                'elk.layered.nodePlacement.strategy': 'NETWORK_SIMPLEX',
            },
            children: elkNodes,
            edges: elkEdges,
        };

        try {
            const layoutedGraph = await elk.layout(graph);
            
            const layoutedNodes = resultNodes.map(node => {
                const layoutNode = layoutedGraph.children?.find((n: any) => n.id === node.id);
                if (layoutNode) {
                    return {
                        ...node,
                        position: {
                            x: layoutNode.x || 0,
                            y: layoutNode.y || 0,
                        },
                    };
                }
                return node;
            });

            setNodes(layoutedNodes);
            setEdges(resultEdges);
            setLoadedCount(() => layoutedNodes.filter(n => n.type === 'personNode').length);

        } catch (error) {
            console.error("ELK Layout error:", error);
            setNodes(resultNodes);
            setEdges(resultEdges);
        }

    }, [getNodes, getEdges, setNodes, setEdges, setLoadedCount, onSelectRef]);

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
            await mergeDataIntoGraph(data, nodeId);

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

    return { mergeDataIntoGraph, handleLazyLoad };
}
