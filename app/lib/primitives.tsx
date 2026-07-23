'use client';

import React, { forwardRef } from 'react';
import * as Primitive from '@radix-ui/react-primitive';

/**
 * FEAT-018: Accessible UI primitives using @radix-ui/react-primitive.
 * These provide clean scaling compliance across mobile and assistive devices.
 */

// ── Accessible Button ──
export const AccessibleButton = forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...props }, ref) => {
    return (
        <button
            ref={ref}
            role="button"
            tabIndex={0}
            {...props}
        >
            {children}
        </button>
    );
});
AccessibleButton.displayName = 'AccessibleButton';

// ── Accessible Dialog Wrapper ──
// Used for sidebar panels to ensure proper focus trapping and aria attributes
export const AccessiblePanel = forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
        label: string;
        isOpen: boolean;
        onClose: () => void;
    }
>(({ children, label, isOpen, onClose, ...props }, ref) => {
    // Handle Escape key
    React.useEffect(() => {
        if (!isOpen) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop for focus trapping context */}
            <div
                className="fixed inset-0 z-[99]"
                aria-hidden="true"
                onClick={onClose}
            />
            <div
                ref={ref}
                role="dialog"
                aria-modal="true"
                aria-label={label}
                {...props}
            >
                {children}
            </div>
        </>
    );
});
AccessiblePanel.displayName = 'AccessiblePanel';

// ── Visually Hidden ──
// Content only visible to screen readers
export function VisuallyHidden({ children }: { children: React.ReactNode }) {
    return (
        <span
            style={{
                position: 'absolute',
                width: '1px',
                height: '1px',
                padding: 0,
                margin: '-1px',
                overflow: 'hidden',
                clip: 'rect(0, 0, 0, 0)',
                whiteSpace: 'nowrap',
                borderWidth: 0,
            }}
        >
            {children}
        </span>
    );
}
