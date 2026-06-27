'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback, useRef } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    Position,
    Handle,
    type Node,
    type Edge,
    ReactFlowProvider
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import '../globals.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// =============================================
// Constants for Node Sizing & Spacing
// =============================================
const CARD_WIDTH = 180;
const CARD_HEIGHT = 70;
const X_OFFSET = 140; // Horizontal distance from Union Node
const Y_OFFSET = 120; // Vertical distance from Union Node

// =============================================
// Custom Node: Person
// =============================================
function PersonNode({ id, data }: { id: string, data: any }) {
    const { onExpand, expandable, gender, label, birthYear, isRoot } = data;
    const [isLoading, setIsLoading] = useState(false);

    const isMale = gender === 'M';
    const isFemale = gender === 'F';

    const borderColor = isRoot ? '#6366f1' : isMale ? '#3b82f6' : isFemale ? '#ec4899' : '#94a3b8';
    const bg = isRoot ? '#eef2ff' : isMale ? '#eff6ff' : isFemale ? '#fdf2f8' : '#f8fafc';
    const avatarBg = isRoot ? '#c7d2fe' : isMale ? '#bfdbfe' : isFemale ? '#fbcfe8' : '#e2e8f0';

    return (
        <div style={{
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            background: bg,
            border: `2px solid ${borderColor}`,
            borderRadius: 12,
            padding: '10px 12px',
            boxShadow: isRoot ? '0 4px 20px rgba(99,102,241,0.25)' : '0 2px 10px rgba(0,0,0,0.07)',
            fontFamily: 'Inter, system-ui, sans-serif',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            opacity: 0,
            animation: 'fadeIn 0.5s ease forwards',
            position: 'relative',
        }}
            className="hover:-translate-y-0.5 hover:shadow-lg transition-all"
        >
            {/* All-direction handles for edge routing */}
            <Handle type="target" position={Position.Top} id="top" style={{ background: 'transparent', border: 'none' }} />
            <Handle type="source" position={Position.Top} id="top-s" style={{ background: 'transparent', border: 'none' }} />
            <Handle type="target" position={Position.Bottom} id="bottom" style={{ background: 'transparent', border: 'none' }} />
            <Handle type="source" position={Position.Bottom} id="bottom-s" style={{ background: 'transparent', border: 'none' }} />
            <Handle type="target" position={Position.Left} id="left" style={{ background: 'transparent', border: 'none' }} />
            <Handle type="source" position={Position.Left} id="left-s" style={{ background: 'transparent', border: 'none' }} />
            <Handle type="target" position={Position.Right} id="right" style={{ background: 'transparent', border: 'none' }} />
            <Handle type="source" position={Position.Right} id="right-s" style={{ background: 'transparent', border: 'none' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                    width: 36, height: 36, borderRadius: 8, background: avatarBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill={borderColor} opacity={0.7}>
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{
                        fontSize: 12, fontWeight: 700, color: '#0f172a',
                        lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                        {label}
                    </div>
                    <div style={{ fontSize: 9, color: '#64748b', fontWeight: 500, marginTop: 2 }}>
                        {birthYear ? `b. ${birthYear}` : ''}
                        {isMale ? ' · Male' : isFemale ? ' · Female' : ''}
                    </div>
                </div>
            </div>

            {isRoot && (
                <div style={{ position: 'absolute', top: -8, right: -8, background: '#6366f1', color: '#fff', padding: '2px 6px', borderRadius: 6, fontSize: 8, fontWeight: 800 }}>★</div>
            )}

            {/* Single expand button at bottom-center */}
            {expandable && (
                <button
                    onClick={(e) => { e.stopPropagation(); setIsLoading(true); onExpand(id); }}
                    style={{
                        position: 'absolute', bottom: -13, left: '50%', transform: 'translateX(-50%)',
                        width: 22, height: 22, borderRadius: '50%', background: '#fff',
                        border: `2px solid ${borderColor}`, color: borderColor,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', zIndex: 10, padding: 0,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                        transition: 'transform 0.15s',
                    }}
                    className="hover:scale-125 focus:outline-none"
                    title="Expand branch"
                >
                    {isLoading
                        ? <span style={{ width: 10, height: 10, borderRadius: '50%', border: `2px solid ${borderColor}`, borderTopColor: 'transparent', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                        : <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                    }
                </button>
            )}
        </div>
    );
}

const nodeTypes = { personNode: PersonNode };

// =============================================
// Main Canvas Implementation
// =============================================
function CanvasImpl() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const [loadedCount, setLoadedCount] = useState(0);
    const [startPersonName, setStartPersonName] = useState('');

    // To prevent concurrent duplicate fetches
    const fetchingIds = useRef<Set<string>>(new Set());
    const handleLazyLoadRef = useRef<((nodeId: string) => void) | undefined>(undefined);

    // Generational Hierarchical Layout
    // placedPositions tracks every node's final position so we never move existing nodes
    const placedPositions = useRef<Map<string, { x: number, y: number }>>(new Map());

    const mergeDataIntoGraph = useCallback((newData: any, anchorId: string | null) => {
        setNodes(currNodes => {
            // 1. Build lookup maps
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

            // 2. Figure out which nodes are genuinely new (not already on canvas)
            const brandNewIndIds = new Set(newInds.map((i: any) => i.id).filter((id: string) => !existingById.has(id)));
            // No union nodes needed — couples connect directly

            // 3. Anchor position for placing new nodes around
            const anchorPos = anchorId
                ? (placedPositions.current.get(anchorId) || existingById.get(anchorId)?.position || { x: 0, y: 0 })
                : { x: 0, y: 0 };

            // 4. Compute relative levels of new nodes via BFS from anchor
            const levels = new Map<string, number>();
            const startId = anchorId || newData.startPersonId || (newInds[0]?.id);
            if (startId) {
                const q: { id: string, level: number }[] = [{ id: startId, level: 0 }];
                levels.set(startId, 0);
                let head = 0;
                while (head < q.length) {
                    const { id, level } = q[head++];
                    // parents
                    (familyByChild.get(id) || []).forEach((fId: string) => {
                        const fam = newFamilies.find((f: any) => f.id === fId);
                        if (fam) {
                            [fam.husband_id, fam.wife_id].forEach((pid: string) => {
                                if (pid && !levels.has(pid)) { levels.set(pid, level - 1); q.push({ id: pid, level: level - 1 }); }
                            });
                            const uId = `u_${fam.id}`; if (!levels.has(uId)) levels.set(uId, level - 1);
                        }
                    });
                    // spouses & children
                    (familiesBySpouse.get(id) || []).forEach((fam: any) => {
                        const partnerId = fam.husband_id === id ? fam.wife_id : fam.husband_id;
                        if (partnerId && !levels.has(partnerId)) { levels.set(partnerId, level); q.push({ id: partnerId, level }); }
                        const uId = `u_${fam.id}`; if (!levels.has(uId)) levels.set(uId, level);
                        (childrenByFamily.get(fam.id) || []).forEach((cId: string) => {
                            if (!levels.has(cId)) { levels.set(cId, level + 1); q.push({ id: cId, level: level + 1 }); }
                        });
                    });
                }
            }

            // 5. For each new node, find a free position
            // Group by level first (same approach as original layout)
            const newLevelGroups = new Map<number, string[]>();
            brandNewIndIds.forEach(id => {
                const lvl = levels.get(id) ?? 0;
                if (!newLevelGroups.has(lvl)) newLevelGroups.set(lvl, []);
                newLevelGroups.get(lvl)!.push(id);
            });
            // No union level groups needed

            // Build bounding set of existing positions so we can avoid overlap
            const occupiedXByY = new Map<number, number[]>(); // y-bucket → array of x positions used
            placedPositions.current.forEach(pos => {
                const yBucket = Math.round(pos.y / 250);
                if (!occupiedXByY.has(yBucket)) occupiedXByY.set(yBucket, []);
                occupiedXByY.get(yBucket)!.push(pos.x);
            });

            const findFreeX = (yBucket: number, startX: number): number => {
                const taken = occupiedXByY.get(yBucket) || [];
                let x = startX;
                // Nudge right until we find a slot with no overlap (240px card width + 60px gap)
                while (taken.some(tx => Math.abs(tx - x) < 300)) x += 300;
                taken.push(x);
                if (!occupiedXByY.has(yBucket)) occupiedXByY.set(yBucket, []);
                occupiedXByY.get(yBucket)!.push(x);
                return x;
            };

            // Place new nodes relative to anchor
            const sortedNewLevels = Array.from(newLevelGroups.keys()).sort((a, b) => a - b);
            sortedNewLevels.forEach(lvl => {
                const nodesHere = newLevelGroups.get(lvl)!;
                const absY = anchorPos.y + lvl * 250;
                const yBucket = Math.round(absY / 250);

                const placed = new Set<string>();
                let currentX = anchorPos.x - (nodesHere.length * 300) / 2;

                const placeNew = (id: string, isUnion: boolean) => {
                    if (placed.has(id) || placedPositions.current.has(id)) return;
                    const freeX = findFreeX(yBucket, currentX);
                    const y = absY + (isUnion ? 60 : 0);
                    placedPositions.current.set(id, { x: freeX, y });
                    placed.add(id);
                    currentX = freeX + (isUnion ? 100 : 300);
                };

                // Group spouses together side-by-side, then remaining
                const processedSpouses = new Set<string>();
                newFamilies.forEach((fam: any) => {
                    const hId = fam.husband_id;
                    const wId = fam.wife_id;
                    if (hId && wId && nodesHere.includes(hId) && nodesHere.includes(wId)) {
                        placeNew(hId, false);
                        placeNew(wId, false);
                        processedSpouses.add(hId);
                        processedSpouses.add(wId);
                    }
                });
                nodesHere.filter(id => !placed.has(id)).forEach(id => placeNew(id, false));
            });

            // 6. Build final node array — FREEZE existing positions, use new positions for brand-new
            const resultNodes: Node[] = currNodes.map(n => ({
                ...n,
                data: (() => {
                    const ind = newInds.find((i: any) => i.id === n.id);
                    if (!ind) return n.data; // not in new data, keep as-is
                    return {
                        ...ind,
                        label: `${ind.given_names || ''} ${ind.surname || ''}`.trim() || 'Unknown',
                        gender: ind.raw_metadata?.SEX || 'U',
                        birthYear: ind.birth_year_calculated || null,
                        expandable: n.id !== anchorId,
                        isRoot: n.data.isRoot,
                        onExpand: (id: string) => handleLazyLoadRef.current?.(id)
                    };
                })()
            }));

            brandNewIndIds.forEach(id => {
                const ind = newInds.find((i: any) => i.id === id)!;
                resultNodes.push({
                    id,
                    type: 'personNode',
                    position: placedPositions.current.get(id) || { x: 0, y: 0 },
                    data: {
                        ...ind,
                        label: `${ind.given_names || ''} ${ind.surname || ''}`.trim() || 'Unknown',
                        gender: ind.raw_metadata?.SEX || 'U',
                        birthYear: ind.birth_year_calculated || null,
                        expandable: id !== anchorId,
                        isRoot: id === newData.startPersonId && !anchorId,
                        onExpand: (id: string) => handleLazyLoadRef.current?.(id)
                    }
                });
            });
            // No union nodes to add

            setLoadedCount(resultNodes.filter(n => n.type === 'personNode').length);
            return resultNodes;
        });

        // Merge Edges additively — never wipe existing edges
        setEdges(currEdges => {
            const edgeMap = new Set(currEdges.map(e => e.id));
            const toAdd: Edge[] = [...currEdges];

            const addEdge = (eId: string, src: string, tgt: string, sHandle: string, tHandle: string, color: string, style?: any) => {
                if (!edgeMap.has(eId)) {
                    toAdd.push({
                        id: eId, source: src, target: tgt,
                        sourceHandle: sHandle, targetHandle: tHandle,
                        type: 'smoothstep',
                        style: { stroke: color, strokeWidth: 2, ...style }
                    });
                    edgeMap.add(eId);
                }
            };

            newData.families?.forEach((fam: any) => {
                // Direct husband ↔ wife pink dashed edge (no union node needed)
                if (fam.husband_id && fam.wife_id) {
                    addEdge(
                        `e_marriage_${fam.id}`,
                        fam.husband_id, fam.wife_id,
                        'right-s', 'left',
                        '#e11d48',
                        { strokeDasharray: '6,4', strokeWidth: 2 }
                    );
                }
            });

            newData.family_children?.forEach((fc: any) => {
                // Children connect from the primary parent (husband if exists, else wife)
                const fam = newData.families?.find((f: any) => f.id === fc.family_id);
                const parentId = fam?.husband_id || fam?.wife_id;
                if (parentId) {
                    addEdge(
                        `e_${parentId}_${fc.child_id}`,
                        parentId, fc.child_id,
                        'bottom-s', 'top',
                        '#64748b',
                        { strokeWidth: 1.5 }
                    );
                }
            });

            return toAdd;
        });

    }, []);

    // Lazy load handler
    const handleLazyLoad = useCallback(async (nodeId: string) => {
        if (fetchingIds.current.has(nodeId)) return;
        fetchingIds.current.add(nodeId);

        try {
            const res = await fetch(`${API_URL}/canvas/data?person=${nodeId}&type=expand`);
            if (!res.ok) throw new Error("Fetch failed");
            const data = await res.json();

            mergeDataIntoGraph(data, nodeId);
        } catch (err) {
            console.error("Lazy load failed:", err);
        }
    }, [mergeDataIntoGraph]);

    useEffect(() => {
        handleLazyLoadRef.current = handleLazyLoad;
    }, [handleLazyLoad]);

    // Initial load
    useEffect(() => {
        (async () => {
            try {
                const params = new URLSearchParams(window.location.search);
                const startId = params.get("id");
                const qs = startId ? `?person=${startId}&type=initial` : `?type=initial`;

                const res = await fetch(`${API_URL}/canvas/data${qs}`);
                if (!res.ok) throw new Error("Failed to fetch initial tree data");
                const data = await res.json();

                const rootInd = data.individuals.find((i: any) => i.id === data.startPersonId);
                if (rootInd) setStartPersonName(`${rootInd.given_names || ''} ${rootInd.surname || ''}`.trim());

                mergeDataIntoGraph(data, null);
                // Seed placed positions from the initial layout after a short delay
                // so placedPositions ref is correct for all future expansions
                setTimeout(() => { }, 0);

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        })();
    }, [mergeDataIntoGraph]);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-[#f8fafc]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
                @keyframes spin { to { transform: rotate(360deg); } }
                .react-flow__attribution { display: none !important; }
                .react-flow__edge-path { transition: stroke 0.2s, stroke-width 0.2s; animation: fadeIn 0.5s ease forwards; }
                .react-flow__edge:hover .react-flow__edge-path { stroke-width: 3px !important; stroke: #6366f1 !important; }
            `}} />

            {loading ? (
                <div className="flex w-full h-full items-center justify-center flex-col gap-5">
                    <div className="w-14 h-14 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />
                    <div className="text-center">
                        <p className="font-bold text-gray-800 text-lg">Loading Infinite Canvas</p>
                        <p className="text-sm text-gray-500 mt-1">Establishing spatial geometry...</p>
                    </div>
                </div>
            ) : (
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    nodeTypes={nodeTypes}
                    fitView
                    fitViewOptions={{ padding: 0.3, maxZoom: 1 }}
                    minZoom={0.02}
                    maxZoom={2}
                    proOptions={{ hideAttribution: true }}
                >
                    <Background color="#cbd5e1" gap={30} size={1} />
                    <Controls position="bottom-left" style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #e2e8f0' }} />
                    <MiniMap
                        nodeColor="#6366f1"
                        maskColor="rgba(248,250,252,0.85)"
                        style={{ border: '1px solid #e2e8f0', borderRadius: 12 }}
                        pannable zoomable
                    />
                </ReactFlow>
            )}

            {/* Home button */}
            <div className="absolute top-5 left-5 z-50">
                <button onClick={() => { localStorage.removeItem('token'); router.push('/'); }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-200 transition-all group"
                >
                    <svg className="w-4 h-4 text-gray-600 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="text-sm font-semibold text-gray-700">Home</span>
                </button>
            </div>

            {/* Right sidebar */}
            <div className="absolute top-5 right-5 z-50 flex flex-col gap-3 w-[190px]">
                {startPersonName && (
                    <div className="p-3 bg-indigo-600 text-white rounded-xl shadow-lg">
                        <p className="text-[9px] uppercase font-bold tracking-widest opacity-70">Starting from</p>
                        <p className="text-sm font-bold mt-0.5 truncate">{startPersonName}</p>
                    </div>
                )}

                <div className="p-3 bg-white rounded-xl shadow-md border border-gray-200">
                    <p className="text-[9px] uppercase font-bold tracking-widest text-gray-400 mb-2">Infinite Stats</p>
                    <div className="space-y-1.5">
                        <div className="flex justify-between">
                            <span className="text-[10px] text-gray-500">Visible Nodes</span>
                            <span className="text-[11px] font-bold text-indigo-600">{loadedCount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CanvasPage() {
    return (
        <ReactFlowProvider>
            <CanvasImpl />
        </ReactFlowProvider>
    );
}