import { createContext, useContext, ReactNode, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Meal } from '../types';

interface FavoritesContextType {
  favorites: Meal[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (meal: Meal) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

// Favori tarifler global state'i Context ile yönetilir ve localStorage'da kalıcı olur.
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useLocalStorage<Meal[]>(
    'tarif-favoriler',
    []
  );

  const isFavorite = useCallback(
    (id: string) => favorites.some((m) => m.idMeal === id),
    [favorites]
  );

  const toggleFavorite = useCallback(
    (meal: Meal) => {
      setFavorites((prev) =>
        prev.some((m) => m.idMeal === meal.idMeal)
          ? prev.filter((m) => m.idMeal !== meal.idMeal)
          : [...prev, meal]
      );
    },
    [setFavorites]
  );

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error('useFavorites, FavoritesProvider içinde kullanılmalıdır.');
  return ctx;
}
