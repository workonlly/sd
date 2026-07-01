'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback, useRef } from 'react';

import {ReactFlow,MiniMap,Background,BackgroundVariant,useNodesState,useEdgesState,useReactFlow,useViewport,ReactFlowProvider,type Node,type Edge,} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import '../globals.css';

import PersonNode from './_canvas/PersonNode';
import Sidebar from './_canvas/Sidebar';


import NetworkToast from './_canvas/NetworkToast';

import { CanvasLoadingSkeleton } from './_canvas/CanvasSkeleton';

import ErrorBoundary from './_canvas/ErrorBoundary';
import { useGraphLayout } from './_canvas/useGraphLayout';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const nodeTypes = { personNode: PersonNode };

function GridBackground() {
    const { zoom } = useViewport();
    const opacity = Math.min(1, Math.max(0, (zoom - 0.18) / 0.55));
    const dotSize = Math.min(2, Math.max(0.8, zoom * 1.6));
    return (
        <Background
            variant={BackgroundVariant.Dots}
            color="#c2b49a"
            gap={30}
            size={dotSize}
            style={{ opacity, transition: 'opacity 0.25s ease' }}
        />
    );
}

function CanvasImpl() {
    const router = useRouter();
    const { fitView, getNode, getViewport, setCenter } = useReactFlow();

    const [loading, setLoading] = useState(true);
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const [loadedCount, setLoadedCount] = useState(0);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [expandError, setExpandError] = useState<string | null>(null);

    const sidebarTriggerRef = useRef<HTMLElement | null>(null);
    const onSelectRef = useRef<((id: string) => void) | undefined>(undefined);

    const { mergeDataIntoGraph } = useGraphLayout({
        setNodes: setNodes as any,
        setEdges: setEdges as any,
        setLoadedCount: setLoadedCount as any,
        onSelectRef,
    });

    const handleSelect = useCallback((nodeId: string) => {
        setSelectedId(nodeId);
        setSidebarOpen(true);


         const url = new URL(window.location.href);
          url.searchParams.set('id', nodeId);
         window.history.pushState({ nodeId }, '', url.toString());
        setTimeout(() => {
            const node = getNode(nodeId);
            if (!node) return;
            const { zoom } = getViewport();
            const cx = node.position.x + ((node.width as number) || 220) / 2;
            const cy = node.position.y + ((node.height as number) || 92) / 2;
            setCenter(cx, cy, { duration: 450, zoom: Math.max(zoom, 0.75) });
        }, 60);
    }, [getNode, getViewport, setCenter]);

    useEffect(() => { onSelectRef.current = handleSelect; }, [handleSelect]);

    


    
    useEffect(() => {
        setNodes(curr => curr.map(n => ({
            ...n,
            data: { ...n.data, isSelected: n.id === selectedId },

        })));
    }, [selectedId, setNodes]);
 

    
    useEffect(() => {
        const handlePopState = (e: PopStateEvent) => {
            const nodeId = e.state?.nodeId;
            if (nodeId) {
              
                setSelectedId(nodeId);
                   setSidebarOpen(true);
                setTimeout(() => {
                    const node = getNode(nodeId);
                    if (node) {
                        const { zoom } = getViewport();
                        const cx = node.position.x + ((node.width as number) || 220) / 2;
                        const cy = node.position.y + ((node.height as number) || 92) / 2;
                        setCenter(cx, cy, { duration: 400, zoom });
                    }
                }, 60);
            } else {
                setSidebarOpen(false);
            }
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [getNode, getViewport, setCenter]);

 
      
    useEffect(() => {
        async function authetication() {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/canvas/guest');
                return;
            }

            try {
                const res = await fetch(`${API_URL}/`, {
                    headers: {
                 
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (res.ok) {
                    const data = await res.json();
                    if (!data.is_authenticated) {
                        router.push('/canvas/guest');
                    }
                } else {
                    
                    localStorage.removeItem('token');
                    router.push('/canvas/guest');
                }
            } catch (error) {
                console.error("Authentication check failed", error);
            }
        }
        authetication();
    }, [])
    
    useEffect(() => {
        (async () => {
            try {
                const params = new URLSearchParams(window.location.search);
                let startId = params.get('id') || null;
                const qs = startId ? `?person=${startId}&type=initial` : `?type=initial`;

                const res = await fetch(`${API_URL}/canvas/data${qs}`);
               
                if (!res.ok) throw new Error('Failed to fetch initial tree data');
                const data = await res.json();

                mergeDataIntoGraph(data, null);

                
                if (startId && data.individuals?.find((i: any) => i.id === startId)) {
                    setTimeout(() => handleSelect(startId!), 200);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        })();
    }, [mergeDataIntoGraph, handleSelect]);

    const selectedPerson = selectedId ? nodes.find(n => n.id === selectedId)?.data as any : null;

    return (
        <div
            className="relative w-full h-screen overflow-hidden bg-[#FAF7F2]"
            style={{ fontFamily: 'Inter, Kalpurush, system-ui, sans-serif' }}
        >
            <NetworkToast lazyLoadError={expandError} onDismissError={() => setExpandError(null)} />

            
            <div aria-live="polite" className="sr-only" role="status">
                {selectedPerson ? `Selected: ${selectedPerson.label}` : 'Family archive canvas'}
            </div>

            {loading ? (
                <CanvasLoadingSkeleton />
            ) : (
                <ErrorBoundary>

                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                          onNodesChange={onNodesChange}
                         onEdgesChange={onEdgesChange}
                        nodeTypes={nodeTypes}
                         fitView
                          fitViewOptions={{ padding: 0.28, maxZoom: 1 }}
                        minZoom={0.05}
                          maxZoom={2.5}
                          proOptions={{ hideAttribution: true }}
                        className="canvas-no-print"
                    >

                        <GridBackground />
                        <MiniMap
                               nodeColor={n => n.data?.isRoot ? '#6366f1' : n.data?.gender === 'M' ? '#60a5fa' : n.data?.gender === 'F' ? '#f43f5e' : '#94a3b8'}
                             maskColor="rgba(250,247,242,0.88)"
                              className="border border-slate-200 rounded-xl canvas-minimap"
                             pannable
                              zoomable
                              position="bottom-left"
                        />
                 
                    </ReactFlow>
                </ErrorBoundary>
            )}

            
            <nav className="absolute top-30 left-6 z-[9999] flex items-center gap-2 canvas-nav canvas-no-print">
                <button
                    onClick={() => { localStorage.removeItem('token'); router.push('/'); }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-md hover:shadow-lg border border-slate-200 transition-all group min-h-[44px]"
                    aria-label="Log out and return to home"
                >
                    <svg className="w-4 h-4 text-slate-500 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="text-sm font-semibold text-slate-700">Logout</span>
                </button>

                
            </nav>

            
            {sidebarOpen && selectedPerson && (
                 <Sidebar
                     person={selectedPerson}
                     onClose={() => { setSidebarOpen(false); }}
                   triggerRef={sidebarTriggerRef}
                />
            )}
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