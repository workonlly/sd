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
                type: eId.startsWith('e_h_') || eId.startsWith('e_w_') ? 'straight' : 'step',
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

        // --- Sort Nodes to Group Spouses (Force Model Order) ---
        const spouseAdj = new Map<string, string[]>();
        const addSpouseAdj = (u: string, v: string) => {
            if (!spouseAdj.has(u)) spouseAdj.set(u, []);
            spouseAdj.get(u)!.push(v);
        };
        resultEdges.forEach(e => {
            if (e.id.startsWith('e_h_') || e.id.startsWith('e_w_')) {
                addSpouseAdj(e.source, e.target);
                addSpouseAdj(e.target, e.source);
            }
        });

        const sortedResultNodes: Node[] = [];
        const visitedNodes = new Set<string>();

        const nodesByPartition = new Map<number, Node[]>();
        for (const n of resultNodes) {
            const d = (n.data?.depth as number) || 0;
            if (!nodesByPartition.has(d)) nodesByPartition.set(d, []);
            nodesByPartition.get(d)!.push(n);
        }

        const partitionKeys = Array.from(nodesByPartition.keys()).sort((a, b) => a - b);
        
        for (const p of partitionKeys) {
            const nodesInP = nodesByPartition.get(p)!;
            const nodesInPMap = new Map(nodesInP.map(n => [n.id, n]));
            
            const dfs = (id: string) => {
                if (visitedNodes.has(id)) return;
                visitedNodes.add(id);
                if (nodesInPMap.has(id)) {
                    sortedResultNodes.push(nodesInPMap.get(id)!);
                }
                const neighbors = spouseAdj.get(id) || [];
                for (const neighbor of neighbors) {
                    if (nodesInPMap.has(neighbor)) {
                        dfs(neighbor);
                    }
                }
            };

            // 1. Start with Person nodes that have only 1 spouse connection (end of chain)
            for (const n of nodesInP) {
                if (n.type === 'personNode' && (spouseAdj.get(n.id)?.length === 1)) {
                    dfs(n.id);
                }
            }
            // 2. Any remaining persons (e.g. no spouses, or circular/complex)
            for (const n of nodesInP) {
                if (n.type === 'personNode') dfs(n.id);
            }
            // 3. Any remaining families
            for (const n of nodesInP) {
                dfs(n.id);
            }
        }
        
        // Modify resultNodes in place so subsequent code uses the sorted array
        resultNodes.length = 0;
        resultNodes.push(...sortedResultNodes);

        // Run ELK layout
        const elkNodes = resultNodes.map(n => {
            const width = n.type === 'familyNode' ? FAMILY_NODE_SIZE : CARD_WIDTH;
            const height = n.type === 'familyNode' ? FAMILY_NODE_SIZE : CARD_HEIGHT;
            return {
                id: n.id,
                width,
                height,
                layoutOptions: {
                    'partitioning.partition': String(n.data?.depth || 0),
                },
                ports: [
                    { id: `${n.id}-left`, properties: { 'port.side': 'WEST' }, width: 0, height: 0, x: 0, y: height / 2 },
                    { id: `${n.id}-right`, properties: { 'port.side': 'EAST' }, width: 0, height: 0, x: width, y: height / 2 },
                    { id: `${n.id}-top`, properties: { 'port.side': 'NORTH' }, width: 0, height: 0, x: width / 2, y: 0 },
                    { id: `${n.id}-bottom`, properties: { 'port.side': 'SOUTH' }, width: 0, height: 0, x: width / 2, y: height }
                ]
            };
        });

        const elkEdges = resultEdges.map(e => {
            const isSpouseEdge = e.id.startsWith('e_h_') || e.id.startsWith('e_w_');
            
            let sPort = `${e.source}-bottom`;
            if (e.sourceHandle?.includes('right')) sPort = `${e.source}-right`;
            else if (e.sourceHandle?.includes('left')) sPort = `${e.source}-left`;
            else if (e.sourceHandle?.includes('top')) sPort = `${e.source}-top`;
            
            let tPort = `${e.target}-top`;
            if (e.targetHandle?.includes('right')) tPort = `${e.target}-right`;
            else if (e.targetHandle?.includes('left')) tPort = `${e.target}-left`;
            else if (e.targetHandle?.includes('bottom')) tPort = `${e.target}-bottom`;

            return {
                id: e.id,
                sources: [sPort],
                targets: [tPort],
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
                'elk.alignment': 'CENTER',
                'elk.edgeRouting': 'ORTHOGONAL',
                'elk.layered.edgeRouting': 'ORTHOGONAL',
                'elk.layered.mergeEdges': 'true',
                'elk.layered.spacing.nodeNodeBetweenLayers': '100',
                'elk.layered.spacing.nodeNode': '100',
                'elk.partitioning.activate': 'true',
                'elk.layered.nodePlacement.strategy': 'NETWORK_SIMPLEX',
                'elk.layered.crossingMinimization.forceNodeModelOrder': 'true',
            },
            children: elkNodes,
            edges: elkEdges,
        };

        try {
            const layoutedGraph = await elk.layout(graph);
            
            const layoutedNodes = resultNodes.map(node => {
                const layoutNode = layoutedGraph.children?.find((n: any) => n.id === node.id);
                if (layoutNode) {
                    let finalY = layoutNode.y || 0;
                    let finalX = layoutNode.x || 0;
                    
                    if (node.type === 'familyNode') {
                        const hEdge = resultEdges.find(e => e.target === node.id && e.id.startsWith('e_h_'));
                        const wEdge = resultEdges.find(e => e.target === node.id && e.id.startsWith('e_w_'));
                        
                        if (hEdge && wEdge) {
                            const hNode = layoutedGraph.children?.find((n: any) => n.id === hEdge.source);
                            const wNode = layoutedGraph.children?.find((n: any) => n.id === wEdge.source);
                            
                            if (hNode && wNode) {
                                // Perfectly horizontally center between them
                                const minX = Math.min(hNode.x || 0, wNode.x || 0);
                                const maxX = Math.max(hNode.x || 0, wNode.x || 0);
                                finalX = ((minX + CARD_WIDTH) + maxX) / 2 - (FAMILY_NODE_SIZE / 2);
                                
                                // Vertically center too
                                finalY = (hNode.y || 0) + (CARD_HEIGHT / 2) - (FAMILY_NODE_SIZE / 2);
                            }
                        } else {
                            // Fallback if only one spouse exists
                            const spouseEdge = hEdge || wEdge;
                            if (spouseEdge) {
                                const spouseLayout = layoutedGraph.children?.find((n: any) => n.id === spouseEdge.source);
                                if (spouseLayout) {
                                    finalY = (spouseLayout.y || 0) + (CARD_HEIGHT / 2) - (FAMILY_NODE_SIZE / 2);
                                    if (spouseEdge.id.startsWith('e_h_')) {
                                        finalX = (spouseLayout.x || 0) + CARD_WIDTH + 50;
                                    } else {
                                        finalX = (spouseLayout.x || 0) - FAMILY_NODE_SIZE - 50;
                                    }
                                }
                            }
                        }
                    }

                    return {
                        ...node,
                        position: {
                            x: finalX,
                            y: finalY,
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
