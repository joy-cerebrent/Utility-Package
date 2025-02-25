import { buildQueryString } from "./buildQueryString";

export const generateCacheKey = (
  method: string,
  baseUrl: string,
  endpoint: string,
  query: Record<string, string | number | boolean>
): string => {
  const queryString = buildQueryString(query);
  return `${method}:${baseUrl}${endpoint}?${queryString}`;
};