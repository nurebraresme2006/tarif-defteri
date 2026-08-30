import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { MealsResponse, Meal } from '../types';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import { useFavorites } from '../context/FavoritesContext';

const API = 'https://www.themealdb.com/api/json/v1/1';

// Malzeme + ölçü çiftlerini (strIngredient1..20 / strMeasure1..20) tek listeye çevirir.
function getIngredients(meal: Meal): string[] {
  const list: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim()) {
      list.push(`${measure?.trim() ?? ''} ${ing.trim()}`.trim());
    }
  }
  return list;
}

// Dinamik route (/tarif/:id): id'ye göre tarif detayını API'den çeker.
export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error, refetch } = useFetch<MealsResponse>(
    id ? `${API}/lookup.php?i=${id}` : null
  );
  const { isFavorite, toggleFavorite } = useFavorites();

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  const meal = data?.meals?.[0];
  if (!meal) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-500 dark:text-gray-400">Tarif bulunamadı.</p>
        <Link
          to="/"
          className="mt-4 inline-block text-orange-500 hover:underline"
        >
          ← Ana sayfaya dön
        </Link>
      </div>
    );
  }

  const ingredients = getIngredients(meal);
  const fav = isFavorite(meal.idMeal);

  return (
    <article className="mx-auto max-w-3xl">
      <Link
        to="/"
        className="mb-4 inline-block text-sm text-orange-500 hover:underline"
      >
        ← Geri
      </Link>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="mb-6 h-72 w-full rounded-2xl object-cover"
      />
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 sm:text-3xl">
            {meal.strMeal}
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {meal.strCategory} · {meal.strArea} mutfağı
          </p>
        </div>
        <button
          onClick={() => toggleFavorite(meal)}
          className="shrink-0 rounded-xl border border-orange-300 px-4 py-2 text-sm font-medium text-orange-600 transition hover:bg-orange-50 dark:border-orange-700 dark:text-orange-400 dark:hover:bg-gray-800"
        >
          {fav ? '❤️ Favoride' : '🤍 Favorilere ekle'}
        </button>
      </div>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-gray-800 dark:text-gray-100">
          Malzemeler
        </h2>
        <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {ingredients.map((ing, idx) => (
            <li
              key={idx}
              className="rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              {ing}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-gray-800 dark:text-gray-100">
          Hazırlanışı
        </h2>
        <p className="whitespace-pre-line leading-relaxed text-gray-700 dark:text-gray-300">
          {meal.strInstructions}
        </p>
      </section>
    </article>
  );
}
