'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

type Tab = 'personal' | 'archives';

interface PersonData {
    id: string;
    label: string;
    rawId?: string;
    gender?: string;
    birthYear?: number | null;
    [key: string]: any;
}

interface SidebarProps {
    person: PersonData | null;
    onClose: () => void;
    onIsolateToggle: (active: boolean) => void;
    isolateActive: boolean;
    triggerRef: React.RefObject<HTMLElement | null>;
}

function ToastNotification({ message, onDone }: { message: string; onDone: () => void }) {
    useEffect(() => {
        const t = setTimeout(onDone, 2500);
        return () => clearTimeout(t);
    }, [onDone]);

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[400] px-5 py-3 bg-slate-800 text-white text-sm font-semibold rounded-xl shadow-2xl flex items-center gap-2.5 animate-[fadeIn_0.3s_ease_forwards]">
            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            {message}
        </div>
    );
}

function EmptyState({ label }: { label: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          
            <svg className="w-12 h-12 text-slate-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-sm font-semibold text-slate-400">No records available</p>
            <p className="text-xs text-slate-300 mt-1">{label}</p>
        </div>
    );
}

function SkeletonRow() {
    return (
        <div className="flex gap-3 p-4 border-b border-slate-100">
            <div className="w-12 h-14 rounded-md shimmer shrink-0" />
            <div className="flex-1 space-y-2 pt-1">
                <div className="h-3 w-3/4 shimmer rounded" />
                <div className="h-2.5 w-1/2 shimmer rounded" />
                <div className="h-2 w-2/3 shimmer rounded" />
            </div>
        </div>
    );
}

function PersonalTab({ person }: { person: PersonData }) {
    const details = [
        { label: 'Full Name', value: person.label },
        { label: 'Record ID', value: person.rawId || person.id },
        { label: 'Gender', value: person.gender === 'M' ? 'Male' : person.gender === 'F' ? 'Female' : 'Unknown' },
        { label: 'Birth Year', value: person.birthYear ? String(person.birthYear) : null },
        { label: 'Birth Place', value: person.birth_place || null },
        { label: 'Death Year', value: person.death_year_calculated ? String(person.death_year_calculated) : null },
        { label: 'Death Place', value: person.death_place || null },
        { label: 'Occupation', value: person.occupation || null },
    ].filter(d => d.value);

    return (
        <div className="p-5 space-y-3">
            <div className="rounded-xl border border-slate-100 overflow-hidden">
                {details.map(({ label, value }) => (
                    <div key={label} className="flex items-start justify-between gap-4 px-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0">{label}</span>
                        <span className="text-sm text-slate-700 text-right font-medium">{value}</span>
                    </div>
                ))}
            </div>

            {details.length === 0 && <EmptyState label="No personal records found for this individual." />}
        </div>
    );
}

function WorksTab({ personId }: { personId: string }) {
    const [works, setWorks] = useState<any[] | null>(null);

    useEffect(() => {
        setWorks(null);
        fetch(`${API_URL}/canvas/publications?person=${personId}`)
            .then(r => r.ok ? r.json() : [])
            .then(setWorks)
            .catch(() => setWorks([]));
    }, [personId]);

    if (works === null) return <><SkeletonRow /><SkeletonRow /></>;

    if (works.length === 0) return <EmptyState label="No publications on record for this individual." />;

    return (
        <div className="p-5 space-y-4">
            {works.map((work: any, i: number) => (
                  <div key={work.id || i} className="rounded-xl border border-slate-100 p-4 hover:border-slate-200 hover:shadow-sm transition-all">
                    {work.cover_url && (
                        <img src={work.cover_url} alt={work.title} className="w-full h-36 object-cover rounded-lg mb-3" />
                      )}
                       <p className="text-sm font-bold text-slate-800 leading-snug">{work.title}</p>
                
                       {work.year && <p className="text-xs text-slate-400 mt-1">{work.year}</p>}
                    {work.description && <p className="text-xs text-slate-500 mt-2 leading-relaxed">{work.description}</p>}
                </div>
            ))}
        </div>
    );
}

function ArchivesTab({ person }: { person: PersonData }) {
    const docs = Array.isArray(person.relativelinks) ? person.relativelinks : [];

    if (docs.length === 0) return <EmptyState label="No historical documents found for this individual." />;

    return (
        <div className="p-5 space-y-3">
            {docs.map((docItem: any, i: number) => {
                  let parsedItem = docItem;
                  if (typeof docItem === 'string' && docItem.trim().startsWith('{')) {
                    try {
                        parsedItem = JSON.parse(docItem);
                    } catch (e) {
                        
                    }
                }
                const isObject = typeof parsedItem === 'object' && parsedItem !== null;
                  const url = isObject ? parsedItem.url : parsedItem;
                const title = isObject && parsedItem.title ? parsedItem.title : `Document ${i + 1}`;
                  const type = isObject && parsedItem.type ? parsedItem.type : null;
                const fallbackDocName = typeof url === 'string' && url.includes('id=') ? new URL(url).searchParams.get('id') : (typeof url === 'string' ? url.split('d/')[1]?.split('/')[0] : null);
                const displayDesc = type || fallbackDocName;

                return (
                <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all group"
                >
                    <div className="w-10 h-12 rounded-md bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-indigo-50 transition-colors">
                        <svg className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-700 truncate group-hover:text-indigo-600 transition-colors">{title}</p>
                        {displayDesc && <p className="text-xs text-slate-400 mt-0.5">{displayDesc}</p>}
                    </div>
                    <svg className="w-4 h-4 text-slate-300 group-hover:text-indigo-400 shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
            )})}
        </div>
    );
}

export default function Sidebar({ person, onClose, onIsolateToggle, isolateActive, triggerRef }: SidebarProps) {
    const [activeTab, setActiveTab] = useState<Tab>('personal');
    const [toast, setToast] = useState<string | null>(null);
    const touchStartX = useRef(0);
    const firstFocusRef = useRef<HTMLButtonElement | null>(null);

    
    useEffect(() => {
        if (person?.label) {
            document.title = `Viewing: ${person.label} | Family Archive`;
        }
        return () => { document.title = 'Family Archive'; };
    }, [person?.label]);

    
    useEffect(() => {
        const saved = triggerRef?.current;
        return () => { saved?.focus(); };
    }, [triggerRef]);

    
    useEffect(() => {
        firstFocusRef.current?.focus();
    }, []);

    const handleTabSwitch = (tab: Tab) => {
        if (typeof navigator.vibrate === 'function') navigator.vibrate(8);
        setActiveTab(tab);
    };

    const handleCopyLink = useCallback(() => {
        const url = new URL(window.location.href);
        if (person?.id) url.searchParams.set('id', person.id);
        navigator.clipboard.writeText(url.toString()).then(() => {
            setToast('Link copied to clipboard!');
        });
    }, [person?.id]);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (delta > 70) onClose();
    };

    if (!person) return null;

    const tabs: { id: Tab; label: string }[] = [
        { id: 'personal', label: 'Personal' },
        { id: 'archives', label: 'Archive' },
    ];

    const getGoogleDriveThumbnail = (url: string) => {
        const idMatch = url.includes('id=') ? new URL(url).searchParams.get('id') : url.split('d/')[1]?.split('/')[0];
        return idMatch ? `https://drive.google.com/thumbnail?id=${idMatch}&sz=w200-h200` : null;
    };
    const thumbnailUrl = person.googleurl ? getGoogleDriveThumbnail(person.googleurl) : null;

    return (
        <>
            <aside
                className="absolute top-0 right-0 h-full w-[360px] max-w-[90vw] bg-white border-l border-slate-200 shadow-2xl z-[100] flex flex-col canvas-sidebar canvas-no-print"
                role="complementary"
                aria-label={`Details for ${person.label}`}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                
                <div className="px-5 mt-25 pb-4 border-b border-slate-100 shrink-0">
                    <div className="flex items-start justify-between gap-3">
                      
                        {thumbnailUrl && (
                       
                       <div className="w-14 h-14 relative rounded-full overflow-hidden shrink-0 border border-slate-200 shadow-sm mt-1">
                                <Image src={thumbnailUrl} alt={person.label} fill className="object-cover" unoptimized sizes="56px" />
                            </div>
                        )}
                        <div className="min-w-0 flex-1">
                            {person.rawId && (
                                <p className="text-[9px] font-mono text-slate-400 tracking-wider mb-1">{person.rawId}</p>
                     
                     )}
                            <h2 className="text-base font-bold text-slate-800 leading-tight break-words">{person.label}</h2>
                            {person.birthYear && (
                                <p className="text-xs text-slate-400 mt-1">b. {person.birthYear}</p>
                            )}
                        </div>
                        <button
                            ref={firstFocusRef}
                            onClick={onClose}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors shrink-0 mt-0.5"
                            aria-label="Close sidebar"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    
                    <div className="flex items-center gap-2 mt-4">
                        <button
                            onClick={handleCopyLink}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all min-h-[44px]"
                            aria-label="Copy deep link for this person"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy Link
                        </button>
                        <button
                            onClick={() => onIsolateToggle(!isolateActive)}
                            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border text-xs font-semibold transition-all min-h-[44px] ${
                                isolateActive
                                    ? 'bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700'
                                    : 'border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                            }`}
                            aria-pressed={isolateActive}
                            aria-label="Toggle isolate view — show only direct relatives"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                   
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {isolateActive ? 'Exit Isolate' : 'Isolate View'}
                        </button>
                    </div>
                </div>

                
                <div className="flex border-b border-slate-100 shrink-0 sticky top-0 bg-white z-10">
                    {tabs.map(tab => (
                        <button
                               key={tab.id}
                        
                               onClick={() => handleTabSwitch(tab.id)}
                            className={`flex-1 py-3 text-xs font-bold tracking-wide transition-all min-h-[44px] ${
                                activeTab === tab.id
                     
                                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                                    : 'text-slate-400 hover:text-slate-600 border-b-2 border-transparent'
                   
                   
                                }`}
                            aria-selected={activeTab === tab.id}
                            role="tab"
                        >
                            {tab.label.toUpperCase()}
                        </button>
                    ))}
                </div>

                
                <div className="flex-1 overflow-y-auto canvas-sidebar-scroll" role="tabpanel">
                
                    {activeTab === 'personal' && <PersonalTab person={person} />}
               
               
                    {activeTab === 'archives' && <ArchivesTab person={person} />}
                </div>
              </aside>
  
            {toast && (
                <ToastNotification message={toast} onDone={() => setToast(null)} />
            )}
        </>
    );
}
