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
    const skeletons = [
        { x: '50%', y: '35%' },
       
        { x: '30%', y: '55%' },
       
        { x: '70%', y: '55%' },
       
         { x: '20%', y: '70%' },
        { x: '50%', y: '70%' },
        { x: '80%', y: '70%' },
    ];

    return (
        <div className="absolute inset-0 bg-[#FAF7F2]" aria-live="polite" aria-label="Loading family tree">
              {skeletons.map((pos, i) => (
              
              <div
                    key={i}
              
                    className="absolute"
                    style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)' }}
                >
                    <NodeSkeleton />
                </div>
            ))}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
              
                  <div className="w-3 h-3 rounded-full bg-indigo-300 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-3 h-3 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '120ms' }} />
              
                 <div className="w-3 h-3 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '240ms' }} />
            </div>
        </div>
    );
}
