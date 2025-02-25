export const buildQueryString = (query: Record<string, string | number | boolean>): string => {
  if (!query) return "";

  const queryParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    queryParams.append(key, value.toString());
  });

  return queryParams.toString() ? `${queryParams.toString()}` : "";
};