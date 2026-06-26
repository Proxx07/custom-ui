export function capitalizeFirstLetter(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const parseRouteQuery = <ParseTo>(
  query?: string | null | Array<string | null>,
  options?: { parseTo: ParseTo },
) => {
  if (options?.parseTo === 'number') {
    return typeof query === 'string' && !Number.isNaN(+query) ? +query : undefined;
  }
  if (options?.parseTo === 'boolean') {
    return typeof query === 'string' && !Number.isNaN(+query) ? Boolean(+query) : undefined;
  }
  if (options?.parseTo === 'array') {
    if (typeof query === 'string') return [query];
    return Array.isArray(query) ? query : [];
  }
  return typeof query === 'string' ? query : undefined;
};
