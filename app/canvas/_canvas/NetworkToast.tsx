'use client';

import { useEffect, useRef, useState } from 'react';

interface NetworkToastProps {
    lazyLoadError?: string | null;
    onDismissError?: () => void;
}

export default function NetworkToast({ lazyLoadError, onDismissError }: NetworkToastProps) {
    const [isOffline, setIsOffline] = useState(false);
  
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setIsOffline(!navigator.onLine);

        
        const handleOffline = () => { setIsOffline(true); setVisible(true); };
       
        const handleOnline = () => {
        
            setIsOffline(false);
            setTimeout(() => setVisible(false), 2500);
        };

          window.addEventListener('offline', handleOffline);
          window.addEventListener('online', handleOnline);
        return () => {
       
            window.removeEventListener('offline', handleOffline);
            window.removeEventListener('online', handleOnline);
        };
    }, []);

    useEffect(() => {
    
        if (isOffline) setVisible(true);
    }, [isOffline]);

 
    const showError = !!lazyLoadError;
    
    const show = visible || showError;


   
    if (!show) return null;

    return (
   
        <div
            className={`
                absolute top-0 left-0 right-0 z-[200] flex items-center justify-between
           
                px-5 py-3 text-sm font-semibold
                transition-transform duration-300
                ${show ? 'translate-y-0' : '-translate-y-full'}
                ${isOffline
                    ? 'bg-amber-500 text-amber-950'
                    : 'bg-rose-600 text-white'
                }
            `}
            role="status"
        
            aria-live="polite"
        >
            <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                        d={isOffline
                            ? "M18.364 5.636a9 9 0 010 12.728M15.536 8.464a5 5 0 010 7.072M12 12h.01M4.93 4.93l14.14 14.14"
                              : "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        }
                    />
                </svg>
          
                <span>
                    {isOffline
                          ? 'Network connection unstable. Viewing cached tree records.'
                        : lazyLoadError || 'Failed to expand branch. Please try again.'
                    }
                </span>
            </div>
            {showError && onDismissError && (
          
          <button
                      onClick={onDismissError}
                      className="ml-4 underline opacity-80 hover:opacity-100 shrink-0"
                    aria-label="Dismiss error"
                >
                    Dismiss
                </button>
            )}
        </div>
    );
}
