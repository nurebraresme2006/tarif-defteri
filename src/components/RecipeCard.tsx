import { Link } from 'react-router-dom';
import { Meal } from '../types';
import { useFavorites } from '../context/FavoritesContext';

// Tarif kartı: görsel, ad, favori butonu ve detay sayfasına link.
export default function RecipeCard({ meal }: { meal: Meal }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(meal.idMeal);

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition hover:shadow-md dark:bg-gray-800 dark:ring-gray-700">
      <button
        onClick={() => toggleFavorite(meal)}
        aria-label={fav ? 'Favorilerden çıkar' : 'Favorilere ekle'}
        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-xl shadow dark:bg-gray-900/90"
      >
        {fav ? '❤️' : '🤍'}
      </button>
      <Link to={`/tarif/${meal.idMeal}`}>
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          loading="lazy"
          className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="p-4">
          <h3 className="line-clamp-1 font-semibold text-gray-800 dark:text-gray-100">
            {meal.strMeal}
          </h3>
          {meal.strArea && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {meal.strArea} mutfağı
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}
