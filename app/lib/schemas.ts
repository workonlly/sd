import { z } from 'zod';

// ── Individual Schema ──
export const IndividualSchema = z.object({
    id: z.string(),
    given_names: z.string().nullable().optional().default(''),
    surname: z.string().nullable().optional().default(''),
    birth_year_calculated: z.number().nullable().optional().default(null),
    profile_media_id: z.string().nullable().optional().default(null),
    raw_metadata: z.record(z.string(), z.any()).nullable().optional().default(null),
    googleurl: z.string().nullable().optional().default(null),
    relativelinks: z.array(z.any()).nullable().optional().default(null),
    birth_place: z.string().nullable().optional().default(null),
    death_year_calculated: z.number().nullable().optional().default(null),
    death_place: z.string().nullable().optional().default(null),
    occupation: z.string().nullable().optional().default(null),
});

export type Individual = z.infer<typeof IndividualSchema>;

// ── Family Schema ──
export const FamilySchema = z.object({
    id: z.string(),
    husband_id: z.string().nullable().optional().default(null),
    wife_id: z.string().nullable().optional().default(null),
    raw_metadata: z.record(z.string(), z.any()).nullable().optional().default(null),
});

export type Family = z.infer<typeof FamilySchema>;

// ── Family Children Schema ──
export const FamilyChildSchema = z.object({
    id: z.number().optional(),
    family_id: z.string(),
    child_id: z.string(),
    relationship_type: z.string().optional().default('biological'),
});

export type FamilyChild = z.infer<typeof FamilyChildSchema>;

// ── Canvas API Response Schema ──
export const CanvasResponseSchema = z.object({
    count: z.number().optional(),
    individuals: z.array(IndividualSchema).default([]),
    families: z.array(FamilySchema).default([]),
    family_children: z.array(FamilyChildSchema).default([]),
    startPersonId: z.string().nullable().optional(),
    expandableIds: z.array(z.string()).optional().default([]),
});

export type CanvasResponse = z.infer<typeof CanvasResponseSchema>;

// ── Publication Schema ──
export const PublicationSchema = z.object({
    id: z.string(),
    title: z.string().nullable().optional(),
    year: z.number().nullable().optional(),
    publication_year: z.number().nullable().optional(),
    publisher: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    cover_url: z.string().nullable().optional(),
    gdrive_file_id: z.string().nullable().optional(),
});

export type Publication = z.infer<typeof PublicationSchema>;

// ── Auth Response Schema ──
export const AuthResponseSchema = z.object({
    message: z.string().optional(),
    token: z.string().optional(),
    data: z.record(z.string(), z.any()).optional(),
    is_authenticated: z.boolean().optional(),
    user: z.record(z.string(), z.any()).optional(),
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;

// ── Safe Parse Helpers ──
// These never throw — they return defaults on failure to prevent UI crashes.

export function parseCanvasResponse(raw: unknown): CanvasResponse {
    const result = CanvasResponseSchema.safeParse(raw);
    if (result.success) return result.data;
    console.warn('[Zod] Canvas response validation failed:', result.error.issues);
    return { individuals: [], families: [], family_children: [], expandableIds: [] };
}

export function parsePublications(raw: unknown): Publication[] {
    const result = z.array(PublicationSchema).safeParse(raw);
    if (result.success) return result.data;
    console.warn('[Zod] Publications validation failed:', result.error.issues);
    return [];
}

export function parseAuthResponse(raw: unknown): AuthResponse {
    const result = AuthResponseSchema.safeParse(raw);
    if (result.success) return result.data;
    console.warn('[Zod] Auth response validation failed:', result.error.issues);
    return {};
}
