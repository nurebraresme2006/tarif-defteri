import { useState, useEffect, useCallback } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Verilen URL'den veri çeken özel (custom) hook.
// loading, error ve "tekrar dene" için refetch fonksiyonu döndürür.
// url null ise istek atılmaz.
export function useFetch<T>(url: string | null) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });
  const [reloadIndex, setReloadIndex] = useState(0);

  const refetch = useCallback(() => setReloadIndex((i) => i + 1), []);

  useEffect(() => {
    if (!url) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    const controller = new AbortController();
    setState({ data: null, loading: true, error: null });

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Sunucu hatası (${res.status}). Lütfen tekrar deneyin.`);
        }
        return res.json() as Promise<T>;
      })
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        const message =
          err instanceof Error
            ? err.message
            : 'Bilinmeyen bir hata oluştu. İnternet bağlantınızı kontrol edin.';
        setState({ data: null, loading: false, error: message });
      });

    return () => controller.abort();
  }, [url, reloadIndex]);

  return { ...state, refetch };
}
