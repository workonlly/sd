'use client';

import { CARD_WIDTH, CARD_HEIGHT } from './PersonNode';

export function NodeSkeleton() {
    return (
        <div
            style={{ width:  CARD_WIDTH, height: CARD_HEIGHT }}
         
            className="  rounded-xl border-2 border-slate-200 bg-white p-3 flex items-center gap-2.5"
            aria-hidden="true"
        > 
        
                 <div className="w-10 h-10 rounded-lg shimmer shrink-0" />
            <div className="flex-1 space-y-2">
                  <div className="h-3 w-4/5 shimmer rounded" />
            
                <div className="h-2 w-1/2 shimmer rounded" />
            </div>
        </div>
    );
}

export function CanvasLoadingSkeleton() {
    return (
        <div className="absolute inset-0 bg-[#FAF7F2] flex items-center justify-center" aria-live="polite" aria-label="Loading family tree">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                <div className="text-indigo-600 font-bold text-sm tracking-widest uppercase animate-pulse">Loading...</div>
            </div>
        </div>
    );
}
