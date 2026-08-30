import { useState, useEffect } from 'react';

// Herhangi bir değeri localStorage ile senkron tutan özel (custom) hook.
// useState gibi [deger, setDeger] döndürür; değer değiştikçe otomatik kaydeder.
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Depolama dolu veya erişilemez olabilir; sessizce geç.
    }
  }, [key, value]);

  return [value, setValue] as const;
}
