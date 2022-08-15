// A wrapper for "JSON.parse()"" to support "undefined" value
export const parseJSONSafely = <T>(value: string | null): T | undefined => {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '');
  } catch {
    return undefined;
  }
};
