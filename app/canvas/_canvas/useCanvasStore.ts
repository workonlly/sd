'use client';

import { create } from 'zustand';

interface CanvasUIState {
    // ── Selection & Sidebar ──
    selectedId: string | null;
    sidebarOpen: boolean;
    searchQuery: string;
    expandError: string | null;

    // ── Actions ──
    setSelectedId: (id: string | null) => void;
    setSidebarOpen: (open: boolean) => void;
    setSearchQuery: (query: string) => void;
    setExpandError: (error: string | null) => void;

    // ── Compound action: select node and open sidebar ──
    selectNode: (id: string) => void;
    clearSelection: () => void;
}

export const useCanvasStore = create<CanvasUIState>((set) => ({
    selectedId: null,
    sidebarOpen: false,
    searchQuery: '',
    expandError: null,

    setSelectedId: (id) => set({ selectedId: id }),
    setSidebarOpen: (open) => set({ sidebarOpen: open }),
    setSearchQuery: (query) => set({ searchQuery: query }),
    setExpandError: (error) => set({ expandError: error }),

    selectNode: (id) => set({ selectedId: id, sidebarOpen: true }),
    clearSelection: () => set({ selectedId: null, sidebarOpen: false }),
}));
