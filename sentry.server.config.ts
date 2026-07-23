/**
 * FEAT-019: Sentry Server-Side Configuration
 * 
 * This file configures Sentry error tracking for the server (Node.js / Next.js server).
 * Set NEXT_PUBLIC_SENTRY_DSN in your .env file.
 */

import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (SENTRY_DSN) {
    Sentry.init({
        dsn: SENTRY_DSN,

        // Performance monitoring
        tracesSampleRate: 0.1,

        // Only report errors in production
        enabled: process.env.NODE_ENV === 'production',

        environment: process.env.NODE_ENV,
    });
}
