import { DateTime } from 'luxon';

/**
 * Normalizes fragmented historical date strings from GEDCOM data
 * into uniform chronological representations.
 *
 * Supported formats:
 *   "1 JAN 1900"   → exact date
 *   "JAN 1900"     → approximate month
 *   "1900"         → year only
 *   "ABT 1850"     → about/circa
 *   "BEF 1860"     → before
 *   "AFT 1840"     → after
 *   "BET 1840 AND 1850" → between range
 *   "CAL 1855"     → calculated
 *   "EST 1860"     → estimated
 */

export interface NormalizedDate {
    iso: string | null;
    display: string;
    year: number | null;
    approximate: boolean;
}

const GEDCOM_MONTHS: Record<string, number> = {
    JAN: 1, FEB: 2, MAR: 3, APR: 4, MAY: 5, JUN: 6,
    JUL: 7, AUG: 8, SEP: 9, OCT: 10, NOV: 11, DEC: 12,
};

export function normalizeHistoricalDate(raw: string | null | undefined): NormalizedDate {
    if (!raw || typeof raw !== 'string') {
        return { iso: null, display: '', year: null, approximate: false };
    }

    const trimmed = raw.trim().toUpperCase();

    // Handle BET ... AND ... range
    const betMatch = trimmed.match(/^BET\w*\s+(.+?)\s+AND\s+(.+)$/i);
    if (betMatch) {
        const from = extractYear(betMatch[1]);
        const to = extractYear(betMatch[2]);
        if (from && to) {
            return {
                iso: null,
                display: `${from}–${to}`,
                year: Math.round((from + to) / 2),
                approximate: true,
            };
        }
    }

    // Handle prefix qualifiers: ABT, CAL, EST, BEF, AFT
    const prefixMatch = trimmed.match(/^(ABT|ABOUT|CAL|EST|BEF|AFT|BEFORE|AFTER)\s+(.+)$/i);
    const isApproximate = !!prefixMatch;
    const dateStr = prefixMatch ? prefixMatch[2] : trimmed;
    const qualifier = prefixMatch ? prefixMatch[1] : null;

    // Try full date: "1 JAN 1900" or "01 JAN 1900"
    const fullMatch = dateStr.match(/^(\d{1,2})\s+([A-Z]{3})\s+(\d{3,4})$/);
    if (fullMatch) {
        const day = parseInt(fullMatch[1]);
        const month = GEDCOM_MONTHS[fullMatch[2]];
        const year = parseInt(fullMatch[3]);
        if (month && year) {
            const dt = DateTime.fromObject({ year, month, day });
            const prefix = getDisplayPrefix(qualifier);
            return {
                iso: dt.isValid ? dt.toISODate() : null,
                display: `${prefix}${dt.isValid ? dt.toFormat('d LLL yyyy') : dateStr}`,
                year,
                approximate: isApproximate,
            };
        }
    }

    // Try month + year: "JAN 1900"
    const monthYearMatch = dateStr.match(/^([A-Z]{3})\s+(\d{3,4})$/);
    if (monthYearMatch) {
        const month = GEDCOM_MONTHS[monthYearMatch[1]];
        const year = parseInt(monthYearMatch[2]);
        if (month && year) {
            const dt = DateTime.fromObject({ year, month, day: 1 });
            const prefix = getDisplayPrefix(qualifier);
            return {
                iso: dt.isValid ? dt.toISODate() : null,
                display: `${prefix}${dt.isValid ? dt.toFormat('LLL yyyy') : dateStr}`,
                year,
                approximate: true,
            };
        }
    }

    // Try year only: "1900"
    const yearOnly = extractYear(dateStr);
    if (yearOnly) {
        const prefix = getDisplayPrefix(qualifier);
        return {
            iso: `${yearOnly}-01-01`,
            display: `${prefix}${yearOnly}`,
            year: yearOnly,
            approximate: isApproximate || !prefixMatch,
        };
    }

    // Fallback — return raw string
    return { iso: null, display: raw, year: extractYear(raw), approximate: true };
}

function extractYear(s: string): number | null {
    const m = s.match(/\d{3,4}/);
    return m ? parseInt(m[0]) : null;
}

function getDisplayPrefix(qualifier: string | null): string {
    if (!qualifier) return '';
    const q = qualifier.toUpperCase();
    if (q === 'ABT' || q === 'ABOUT' || q === 'CAL' || q === 'EST') return 'c. ';
    if (q === 'BEF' || q === 'BEFORE') return 'bef. ';
    if (q === 'AFT' || q === 'AFTER') return 'aft. ';
    return '';
}

/**
 * Formats a birth year for display on nodes and sidebars.
 * Uses "c." prefix if the year is approximate.
 */
export function formatBirthYear(
    year: number | null | undefined,
    approximate: boolean = false
): string {
    if (!year) return '';
    return approximate ? `c. ${year}` : `b. ${year}`;
}

/**
 * Formats a death year for display.
 */
export function formatDeathYear(
    year: number | null | undefined,
    approximate: boolean = false
): string {
    if (!year) return '';
    return approximate ? `c. ${year}` : `d. ${year}`;
}
