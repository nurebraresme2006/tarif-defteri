import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import RecipeCard from '../components/RecipeCard';

// Favoriler sayfası: Context + localStorage'dan gelen favori tarifleri gösterir.
export default function Favorites() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-4xl">🤍</p>
        <p className="mt-3 text-gray-500 dark:text-gray-400">
          Henüz favori tarifin yok.
        </p>
        <Link
          to="/"
          className="mt-4 inline-block text-orange-500 hover:underline"
        >
          Tariflere göz at →
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100">
        Favori Tariflerim ({favorites.length})
      </h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((meal) => (
          <RecipeCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </div>
  );
}
