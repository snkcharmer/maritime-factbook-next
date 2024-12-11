export const handleRequest = async <T>(
  endpoint: string,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void,

  setData?: (data: T | any) => void, // Adjusted to work with the generic type T
  options: RequestInit = {}
): Promise<T | null> => {
  setLoading(true);
  setError(null);

  try {
    const res = await fetch(endpoint, options);

    if (!res.ok) {
      const errorResponse = await res.json();
      setError(errorResponse.error || 'Failed to process the request');
      setLoading(false);
      // return { success: false, error: errorResponse.error };
      return null;
    }

    const result: T = await res.json();
    setData?.(result); // Use setData safely with type T
    setLoading(false);
    return result;
  } catch (err) {
    console.error(err);
    setError('An unexpected error occurred');
    setLoading(false);
    // return { success: false, error: 'An unexpected error occurred' };
    return null;
  }
};
