'use client';

import { QueryClient } from '@tanstack/react-query';

let queryClient: QueryClient | null = null;

export function getQueryClient(): QueryClient {
    if (!queryClient) {
        queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    staleTime: 5 * 60 * 1000,      // 5 min — tree data doesn't change often
                    gcTime: 10 * 60 * 1000,         // 10 min garbage collection window
                    retry: 2,
                    refetchOnWindowFocus: false,     // prevent re-fetch spam on tab switch
                    refetchOnReconnect: true,
                },
            },
        });
    }
    return queryClient;
}
