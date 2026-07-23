/**
 * FEAT-019: Sentry Client-Side Configuration
 * 
 * This file configures Sentry error tracking for the client (browser).
 * Set NEXT_PUBLIC_SENTRY_DSN in your .env file.
 */

import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (SENTRY_DSN) {
    Sentry.init({
        dsn: SENTRY_DSN,

        // Performance monitoring — sample 10% of transactions
        tracesSampleRate: 0.1,

        // Session replay — sample 5% of sessions
        replaysSessionSampleRate: 0.05,
        replaysOnErrorSampleRate: 1.0,

        // Only report errors in production
        enabled: process.env.NODE_ENV === 'production',

        // Filter out noisy errors
        ignoreErrors: [
            'ResizeObserver loop limit exceeded',
            'ResizeObserver loop completed with undelivered notifications',
            'Non-Error promise rejection captured',
        ],

        // Tag the app
        environment: process.env.NODE_ENV,
    });
}
