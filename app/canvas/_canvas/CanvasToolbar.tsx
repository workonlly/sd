'use client';

/**
 * FEAT-021: Canvas Control Toolbar with Drive PDF download button.
 * Floating toolbar overlay on the canvas view.
 */

const TREE_PDF_URL = process.env.NEXT_PUBLIC_TREE_PDF_URL || '';

interface CanvasToolbarProps {
    loadedCount?: number;
}

export default function CanvasToolbar({ loadedCount }: CanvasToolbarProps) {
    const handleDownloadPDF = () => {
        if (TREE_PDF_URL) {
            window.open(TREE_PDF_URL, '_blank', 'noopener,noreferrer');
        } else {
            // Fallback: trigger browser print dialog for canvas
            window.print();
        }
    };

    return (
        <div className="absolute top-30 right-6 z-[9998] flex items-center gap-2 canvas-no-print">
            {/* Person count badge */}
            {loadedCount !== undefined && loadedCount > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-xl shadow-md border border-slate-200 text-xs font-semibold text-slate-600">
                    <svg className="w-3.5 h-3.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{loadedCount}</span>
                </div>
            )}

            {/* Download PDF / Print button */}
            <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-1.5 px-3 py-2.5 bg-white rounded-xl shadow-md hover:shadow-lg border border-slate-200 transition-all group min-h-[44px]"
                aria-label="Download tree as PDF"
                title={TREE_PDF_URL ? "Download tree PDF from Google Drive" : "Print tree layout"}
            >
                <svg className="w-4 h-4 text-slate-500 group-hover:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-xs font-semibold text-slate-700 hidden sm:inline">
                    {TREE_PDF_URL ? 'Download PDF' : 'Print'}
                </span>
            </button>
        </div>
    );
}
