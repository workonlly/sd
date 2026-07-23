'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
import { parseAuthResponse, parsePublications } from '../../lib/schemas';
import { normalizeHistoricalDate, formatBirthYear, formatDeathYear } from '../../lib/dates';

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

// ── FEAT-013: Date formatting applied to personal details ──
function PersonalTab({ person }: { person: PersonData }) {
    const birthDate = person.raw_metadata?.BIRT_DATE
        ? normalizeHistoricalDate(person.raw_metadata.BIRT_DATE)
        : null;
    const deathDate = person.raw_metadata?.DEAT_DATE
        ? normalizeHistoricalDate(person.raw_metadata.DEAT_DATE)
        : null;

    const details = [
        { label: 'Full Name', value: person.label },
        { label: 'Record ID', value: person.rawId || person.id },
        { label: 'Gender', value: person.gender === 'M' ? 'Male' : person.gender === 'F' ? 'Female' : 'Unknown' },
          { label: 'Birth Year', value: birthDate?.display || (person.birthYear ? formatBirthYear(person.birthYear) : null) },
         { label: 'Birth Place', value: person.birth_place || null },
          { label: 'Death Year', value: deathDate?.display || (person.death_year_calculated ? formatDeathYear(person.death_year_calculated) : null) },
       
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

// ── FEAT-011: Works tab uses react-query ──
function WorksTab({ personId }: { personId: string }) {
    const { data: works, isLoading } = useQuery({
        queryKey: ['publications', personId],
        queryFn: async () => {
            const res = await fetch(`${API_URL}/canvas/publications?person=${personId}`);
            if (!res.ok) return [];
            const raw = await res.json();
            return parsePublications(raw);
        },
        staleTime: 5 * 60 * 1000,
    });

    if (isLoading) return <><SkeletonRow /><SkeletonRow /></>;

    if (!works || works.length === 0) return <EmptyState label="No publications on record for this individual." />;

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

// ── FEAT-011: Archives tab uses react-query for auth check ──
function ArchivesTab({ person }: { person: PersonData }) {
    const { data: authState, isLoading: authLoading } = useQuery({
        queryKey: ['sidebar-auth-check'],
        queryFn: async () => {
            const token = localStorage.getItem('token');
            if (!token) return { authenticated: false };

            const res = await fetch(`${API_URL}/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!res.ok) {
                localStorage.removeItem('token');
                return { authenticated: false };
            }

            const data = await res.json();
            const parsed = parseAuthResponse(data);
            return { authenticated: !!parsed.is_authenticated };
        },
        staleTime: 2 * 60 * 1000,
        retry: false,
    });

    if (authLoading) {
        return <div className="p-5 text-sm text-slate-500">Checking access...</div>;
    }

    if (!authState?.authenticated) {
        return (
            <div className="p-8 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-2">
                    <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h3 className="text-base font-bold text-slate-800">Restricted Access</h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
                    Historical documents and archives are restricted to un-authorized family members.
                </p>
                <Link 
                    href="/archieve_login"
                    className="inline-flex items-center justify-center px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm mt-2"
                >
                    Login to View Archives
                </Link>
            </div>
        );
    }

    const docs = Array.isArray(person.relativelinks) ? person.relativelinks : [];

    if (docs.length === 0) return <EmptyState label="No historical documents found for this individual." />;

    const parentRef = useRef<HTMLDivElement>(null);

    const rowVirtualizer = useVirtualizer({
        count: docs.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 84, // 72px item + 12px gap
    });

    return (
        <div ref={parentRef} className="h-full overflow-y-auto p-5" style={{ maxHeight: '100%' }}>
            <div
                style={{
                    height: `${rowVirtualizer.getTotalSize()}px`,
                    width: '100%',
                    position: 'relative',
                }}
            >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                    const docItem = docs[virtualRow.index];
                    let parsedItem = docItem;
                    if (typeof docItem === 'string' && docItem.trim().startsWith('{')) {
                        try { parsedItem = JSON.parse(docItem); } catch (e) {}
                    }
                    const isObject = typeof parsedItem === 'object' && parsedItem !== null;
                    const url = isObject ? parsedItem.url : parsedItem;
                    const title = isObject && parsedItem.title ? parsedItem.title : `Document ${virtualRow.index + 1}`;
                    
                    const type = isObject && parsedItem.type ? parsedItem.type : null;
                    const fallbackDocName = typeof url === 'string' && url.includes('id=') ? new URL(url).searchParams.get('id') : (typeof url === 'string' ? url.split('d/')[1]?.split('/')[0] : null);
                    const displayDesc = type || fallbackDocName;

                    return (
                        <div
                            key={virtualRow.key}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: `${virtualRow.size}px`,
                                transform: `translateY(${virtualRow.start}px)`,
                                paddingBottom: '12px'
                            }}
                        >
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all group h-full"
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
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default function Sidebar({ person, onClose, triggerRef }: SidebarProps) {
    const [activeTab, setActiveTab] = useState<Tab>('personal');
    const [toast, setToast] = useState<string | null>(null);
    const touchStartX = useRef(0);
    const firstFocusRef = useRef<HTMLButtonElement | null>(null);

    // ── FEAT-022: Admin Photo Upload ──
    const [uploadingPhoto, setUploadingPhoto] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const isAdmin = useMemo(() => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return false;
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.role === 'admin';
        } catch { return false; }
    }, []);

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !person?.id) return;
        
        const token = localStorage.getItem('token');
        if (!token) {
            setToast('Authentication required to upload photos.');
            return;
        }

        setUploadingPhoto(true);
        const formData = new FormData();
        formData.append('photo', file);
        formData.append('individual_id', person.id);

        try {
            const res = await fetch(`${API_URL}/canvas/upload-photo`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData,
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.message || 'Upload failed');
            }

            setToast('Photo uploaded successfully! Refreshing...');
            setTimeout(() => window.location.reload(), 1500);
        } catch (err: any) {
            setToast(err.message || 'Failed to upload photo');
        } finally {
            setUploadingPhoto(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    
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

    // ── FEAT-007: Generate share URL with share=1 param ──
    const handleCopyLink = useCallback(() => {
           const url = new URL(window.location.href);
              if (person?.id) {
                  url.searchParams.set('id', person.id);
                  url.searchParams.set('share', '1');
              }
                navigator.clipboard.writeText(url.toString()).then(() => {
                   setToast('Share link copied to clipboard!');
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
                                <p className="text-xs text-slate-400 mt-1">{formatBirthYear(person.birthYear)}</p>
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
                            aria-label="Copy share link for this person"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Share Link
                        </button>

                        {/* ── FEAT-022: Admin Photo Upload Button ── */}
                        {isAdmin && (
                            <>
                                <input 
                                    type="file" 
                                    accept="image/jpeg, image/png, image/webp, image/gif" 
                                    className="hidden" 
                                    ref={fileInputRef} 
                                    onChange={handlePhotoUpload} 
                                />
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploadingPhoto}
                                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-all min-h-[44px]"
                                    aria-label="Upload photo for this person"
                                >
                                    {uploadingPhoto ? (
                                        <svg className="animate-spin w-3.5 h-3.5 text-indigo-600" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )}
                                    {uploadingPhoto ? 'Uploading...' : 'Photo'}
                                </button>
                            </>
                        )}

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
