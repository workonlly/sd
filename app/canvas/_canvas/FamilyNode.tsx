'use client';

import { Handle, Position } from '@xyflow/react';

export default function FamilyNode() {
    return (
        <div className="w-4 h-4 rounded-full bg-slate-400 border-2 border-white shadow-sm cursor-grab active:cursor-grabbing">
            <Handle type="target" position={Position.Left} id="left" className="!bg-transparent !border-none" />
            <Handle type="target" position={Position.Right} id="right" className="!bg-transparent !border-none" />
            
            <Handle type="target" position={Position.Top} id="top" className="!bg-transparent !border-none" />
            
            <Handle type="source" position={Position.Bottom} id="bottom-s" className="!bg-transparent !border-none" />
        </div>
    );
}
