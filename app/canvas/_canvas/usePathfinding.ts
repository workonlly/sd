'use client';

import { useMemo } from 'react';
import type { Node, Edge } from '@xyflow/react';

/**
 * FEAT-017: Pathfinding utilities using a lightweight adjacency list
 * instead of requiring graphlib (which can be used as a heavier alternative).
 *
 * Builds a bidirectional graph from React Flow nodes and edges,
 * then provides BFS-based pathfinding for bloodline calculations.
 */

interface PathfindingGraph {
    adjacency: Map<string, Set<string>>;
    parentOf: Map<string, Set<string>>;
    childOf: Map<string, Set<string>>;
}

function buildGraph(nodes: Node[], edges: Edge[]): PathfindingGraph {
    const adjacency = new Map<string, Set<string>>();
    const parentOf = new Map<string, Set<string>>();
    const childOf = new Map<string, Set<string>>();

    // Initialize all nodes
    for (const n of nodes) {
        if (!adjacency.has(n.id)) adjacency.set(n.id, new Set());
        if (!parentOf.has(n.id)) parentOf.set(n.id, new Set());
        if (!childOf.has(n.id)) childOf.set(n.id, new Set());
    }

    // Build adjacency from edges
    for (const e of edges) {
        const src = e.source;
        const tgt = e.target;

        if (!adjacency.has(src)) adjacency.set(src, new Set());
        if (!adjacency.has(tgt)) adjacency.set(tgt, new Set());

        adjacency.get(src)!.add(tgt);
        adjacency.get(tgt)!.add(src);

        // Track parent-child relationships
        // In the graph: parent → family_node → child
        // Edge going from family node to child = parent→child relationship
        if (src.startsWith('fam_')) {
            // family → child
            if (!parentOf.has(src)) parentOf.set(src, new Set());
            parentOf.get(src)!.add(tgt);
            if (!childOf.has(tgt)) childOf.set(tgt, new Set());
            childOf.get(tgt)!.add(src);
        }
    }

    return { adjacency, parentOf, childOf };
}

/**
 * BFS to find shortest path between two node IDs.
 */
function bfsPath(graph: PathfindingGraph, fromId: string, toId: string): string[] {
    if (fromId === toId) return [fromId];
    if (!graph.adjacency.has(fromId) || !graph.adjacency.has(toId)) return [];

    const visited = new Set<string>();
    const queue: { id: string; path: string[] }[] = [{ id: fromId, path: [fromId] }];
    visited.add(fromId);

    while (queue.length > 0) {
        const { id, path } = queue.shift()!;
        const neighbors = graph.adjacency.get(id);
        if (!neighbors) continue;

        for (const neighbor of neighbors) {
            if (visited.has(neighbor)) continue;
            const newPath = [...path, neighbor];
            if (neighbor === toId) return newPath;
            visited.add(neighbor);
            queue.push({ id: neighbor, path: newPath });
        }
    }

    return []; // No path found
}

/**
 * Get all ancestors via BFS up the tree.
 */
function getAncestors(graph: PathfindingGraph, id: string): string[] {
    const ancestors: string[] = [];
    const visited = new Set<string>();
    const queue = [id];
    visited.add(id);

    while (queue.length > 0) {
        const current = queue.shift()!;
        const parents = graph.childOf.get(current);
        if (!parents) continue;

        for (const parent of parents) {
            // parent is a family node — get its parents (the actual people connected to it)
            const grandparents = graph.childOf.get(parent);
            const familyParents = graph.adjacency.get(parent);
            const candidates = new Set([...(grandparents || []), ...(familyParents || [])]);

            for (const candidate of candidates) {
                if (!visited.has(candidate) && !candidate.startsWith('fam_')) {
                    visited.add(candidate);
                    ancestors.push(candidate);
                    queue.push(candidate);
                }
            }
        }
    }

    return ancestors;
}

/**
 * Get all descendants via BFS down the tree.
 */
function getDescendants(graph: PathfindingGraph, id: string): string[] {
    const descendants: string[] = [];
    const visited = new Set<string>();
    const queue = [id];
    visited.add(id);

    while (queue.length > 0) {
        const current = queue.shift()!;
        const familyNodes = graph.parentOf.get(current);
        if (!familyNodes) continue;

        for (const famNode of familyNodes) {
            const children = graph.parentOf.get(famNode);
            if (!children) continue;

            for (const child of children) {
                if (!visited.has(child) && !child.startsWith('fam_')) {
                    visited.add(child);
                    descendants.push(child);
                    queue.push(child);
                }
            }
        }
    }

    return descendants;
}

export function usePathfinding(nodes: Node[], edges: Edge[]) {
    const graph = useMemo(() => buildGraph(nodes, edges), [nodes, edges]);

    return useMemo(() => ({
        /**
         * Find the shortest bloodline path between two individuals.
         * Returns array of node IDs (including family nodes).
         */
        findBloodline: (fromId: string, toId: string): string[] => {
            return bfsPath(graph, fromId, toId).filter(id => !id.startsWith('fam_'));
        },

        /**
         * Calculate generational distance between two individuals.
         * Returns the number of generational hops (excluding family nodes).
         */
        getGenerationalDistance: (fromId: string, toId: string): number => {
            const path = bfsPath(graph, fromId, toId);
            // Each generation hop crosses 2 edges (person → family → person)
            return Math.floor(path.filter(id => !id.startsWith('fam_')).length - 1);
        },

        /**
         * Get all ancestor IDs for a given individual.
         */
        getAncestors: (id: string): string[] => getAncestors(graph, id),

        /**
         * Get all descendant IDs for a given individual.
         */
        getDescendants: (id: string): string[] => getDescendants(graph, id),
    }), [graph]);
}
