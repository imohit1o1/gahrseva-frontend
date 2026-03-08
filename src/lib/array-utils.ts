/**
 * Helper to chunk an array into a specific number of columns (parts)
 * Useful for grid-based layouts where data needs to be balanced across columns
 */
export function chunkIntoColumns<T>(array: T[] | undefined | null, columns: number = 3): T[][] {
    if (!array || array.length === 0) {
        return Array.from({ length: columns }, () => []);
    }

    const len = array.length;
    const result: T[][] = [];

    for (let i = 0; i < columns; i++) {
        const start = Math.ceil((i * len) / columns);
        const end = Math.ceil(((i + 1) * len) / columns);
        result.push(array.slice(start, end));
    }

    return result;
}
