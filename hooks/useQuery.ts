
import { useState, useEffect, useCallback } from 'react';

type QueryFunction<T> = (...args: any[]) => Promise<T>;

interface UseQueryState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useQuery<T, P extends any[]>(
  queryFn: (...args: P) => Promise<T>, 
  ...args: P
) {
  const [state, setState] = useState<UseQueryState<T>>({
    data: null,
    loading: true,
    error: null,
  });
  
  const memoizedArgs = JSON.stringify(args);

  const fetchData = useCallback(() => {
    setState({ data: null, loading: true, error: null });
    queryFn(...args)
      .then(data => {
        setState({ data, loading: false, error: null });
      })
      .catch(error => {
        setState({ data: null, loading: false, error });
      });
  }, [queryFn, memoizedArgs]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}
