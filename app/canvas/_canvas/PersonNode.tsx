'use client';

import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from '@xyflow/react';

export const CARD_WIDTH = 220;
export const CARD_HEIGHT = 92;

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

function AvatarSVG({ isFemale, colorClass }: { isFemale: boolean; colorClass: string }) {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" className={`fill-current opacity-60 ${colorClass}`}>
            {isFemale ? (
                <path d="M12 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 10c-4.42 0-8 1.79-8 4v1h16v-1c0-2.21-3.58-4-8-4z" />
            ) : (
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            )}
        </svg>
    );
}

function PersonPortrait({ personId, googleurl, isFemale, avatarBgClass, colorClass }: {
    personId: string;
    googleurl?: string | null;
    isFemale: boolean;
    avatarBgClass: string;
    colorClass: string;
}) {
    const [failed, setFailed] = useState(false);
    const [src, setSrc] = useState<string | null>(null);

    useEffect(() => {
        if (googleurl) {
            const idMatch = googleurl.includes('id=') ? new URL(googleurl).searchParams.get('id') : googleurl.split('d/')[1]?.split('/')[0];
            if (idMatch) {
                setSrc(`https://drive.google.com/thumbnail?id=${idMatch}&sz=w200-h200`);
                return;
            }
        }
        
        const conn = (navigator as any).connection;
        const isSlow = conn && (conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g');
        if (!isSlow && personId) {
            setSrc(`${API_URL}/images/${personId}.jpg`);
        }
    }, [personId, googleurl]);

    if (!src || failed) {
        return (
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${avatarBgClass}`}>
                <AvatarSVG isFemale={isFemale} colorClass={colorClass} />
            </div>
        );
    }

    return (
        <div className="w-10 h-10 rounded-lg shrink-0 overflow-hidden">
            <img
                src={src}
                alt=""
                onError={() => setFailed(true)}
                className="w-full h-full object-cover"
                loading="lazy"
            />
        </div>
    );
}

export default function PersonNode({ id, data }: { id: string; data: any }) {
    const {
        onExpand, onSelect, expandable, gender, label,
        birthYear, isRoot, rawId, isSelected, isIsolated, googleurl
    } = data;

    const [isExpanding, setIsExpanding] = useState(false);
    const nodeRef = useRef<HTMLDivElement>(null);

    const isMale = gender === 'M';
    const isFemale = gender === 'F';

    const borderColor = isRoot ? 'border-indigo-500'
        : isMale ? 'border-blue-400'
        : isFemale ? 'border-rose-400'
        : 'border-slate-300';

    const bgColor = isRoot ? 'bg-indigo-50'
        : isMale ? 'bg-blue-50'
        : isFemale ? 'bg-rose-50'
        : 'bg-slate-50';

    const avatarBg = isRoot ? 'bg-indigo-100'
        : isMale ? 'bg-blue-100'
        : isFemale ? 'bg-rose-100'
        : 'bg-slate-100';

    const colorText = isRoot ? 'text-indigo-500'
        : isMale ? 'text-blue-500'
        : isFemale ? 'text-rose-500'
        : 'text-slate-400';

    const shadowStyle = isRoot
        ? 'shadow-[0_4px_20px_rgba(99,102,241,0.22)]'
        : 'shadow-[0_2px_8px_rgba(0,0,0,0.06)]';

    const selectedStyle = isSelected
        ? 'ring-2 ring-indigo-500 ring-offset-1 shadow-[0_0_0_4px_rgba(99,102,241,0.18),0_4px_20px_rgba(99,102,241,0.22)]'
        : '';

    const isolatedStyle = isIsolated === false ? 'opacity-[0.12] pointer-events-none' : '';

    const displayName = label || 'Unknown';
    const nameFontSize = displayName.length > 20 ? 'text-[10.5px]' : displayName.length > 15 ? 'text-[12px]' : 'text-[13px]';

    const handleExpandClick = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (typeof navigator.vibrate === 'function') navigator.vibrate(10);
        setIsExpanding(true);
        try {
            await onExpand?.(id);
        } finally {
            setIsExpanding(false);
        }
    };

    const handleClick = () => {
        if (typeof navigator.vibrate === 'function') navigator.vibrate(8);
        onSelect?.(id);
    };

    return (
        <div
            ref={nodeRef}
            style={{ width: CARD_WIDTH, height: CARD_HEIGHT, willChange: 'transform, opacity' }}
            className={`
                rounded-xl box-border flex flex-col justify-center px-3 py-2
                opacity-0 animate-[fadeIn_0.4s_ease_forwards]
                border-2 cursor-pointer select-none transition-all duration-200
                hover:scale-[1.03] hover:shadow-md
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
                ${bgColor} ${borderColor} ${shadowStyle} ${selectedStyle} ${isolatedStyle}
            `}
            role="button"
            tabIndex={0}
            aria-label={`${displayName}${birthYear ? `, born ${birthYear}` : ''}${isMale ? ', male' : isFemale ? ', female' : ''}`}
            aria-pressed={isSelected}
            onClick={handleClick}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
        >
            <Handle type="target" position={Position.Top} id="top" className="!bg-transparent !border-none" />
            <Handle type="source" position={Position.Top} id="top-s" className="!bg-transparent !border-none" />
            <Handle type="target" position={Position.Bottom} id="bottom" className="!bg-transparent !border-none" />
            <Handle type="source" position={Position.Bottom} id="bottom-s" className="!bg-transparent !border-none" />
            <Handle type="target" position={Position.Left} id="left" className="!bg-transparent !border-none" />
            <Handle type="source" position={Position.Left} id="left-s" className="!bg-transparent !border-none" />
            <Handle type="target" position={Position.Right} id="right" className="!bg-transparent !border-none" />
            <Handle type="source" position={Position.Right} id="right-s" className="!bg-transparent !border-none" />

            {rawId && (
                <div className="text-[8px] text-slate-400 font-mono tracking-wider mb-1 leading-none">{rawId}</div>
            )}

            <div className="flex items-center gap-2.5">
                <PersonPortrait 
                    personId={rawId} 
                    googleurl={googleurl}
                    isFemale={isFemale} 
                    avatarBgClass={avatarBg} 
                    colorClass={colorText} 
                />
                <div className="min-w-0 flex-1">
                    <div className={`font-bold text-slate-800 leading-snug overflow-hidden text-ellipsis whitespace-nowrap ${nameFontSize}`}>
                        {displayName}
                    </div>
                    <div className="text-[9px] text-slate-500 font-medium mt-0.5 flex items-center gap-1">
                        {birthYear && <span>b.{birthYear}</span>}
                        {birthYear && (isMale || isFemale) && <span className="opacity-30">·</span>}
                        <span>{isMale ? 'Male' : isFemale ? 'Female' : ''}</span>
                    </div>
                </div>
            </div>

            {isRoot && (
                <div className="absolute -top-2 -right-2 bg-indigo-500 text-white px-1.5 py-0.5 rounded-md text-[8px] font-extrabold">
                    ★
                </div>
            )}

            {expandable && (
                <div className="absolute -bottom-[22px] left-1/2 -translate-x-1/2 flex items-start justify-center" style={{ width: 44, height: 44 }}>
                    <button
                        onClick={handleExpandClick}
                        className={`
                            w-[22px] h-[22px] rounded-full bg-white border-2 flex items-center justify-center
                            shadow-[0_2px_6px_rgba(0,0,0,0.15)] transition-transform hover:scale-125
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400
                            mt-0 ${borderColor} ${colorText}
                        `}
                        title="Expand branch"
                        aria-label="Expand family branch"
                    >
                        {isExpanding
                            ? <span className={`w-2.5 h-2.5 rounded-full border-2 border-t-transparent inline-block animate-spin ${borderColor}`} />
                            : <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                        }
                    </button>
                </div>
            )}
        </div>
    );
}
