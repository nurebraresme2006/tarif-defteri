import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { MealsResponse } from '../types';
import RecipeCard from '../components/RecipeCard';
import SearchForm from '../components/SearchForm';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

const API = 'https://www.themealdb.com/api/json/v1/1';
const CATEGORIES = ['Seafood', 'Beef', 'Chicken', 'Dessert', 'Vegetarian', 'Pasta'];

// Ana sayfa: arama, kategori filtresi ve API'den çekilen tarif listesi.
export default function Home() {
  const [query, setQuery] = useState<string>(`${API}/filter.php?c=Seafood`);
  const [activeCat, setActiveCat] = useState<string>('Seafood');
  const { data, loading, error, refetch } = useFetch<MealsResponse>(query);

  const handleSearch = (term: string) => {
    setActiveCat('');
    setQuery(`${API}/search.php?s=${encodeURIComponent(term)}`);
  };

  const handleCategory = (cat: string) => {
    setActiveCat(cat);
    setQuery(`${API}/filter.php?c=${encodeURIComponent(cat)}`);
  };

  const meals = data?.meals ?? [];

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-gradient-to-br from-orange-500 to-amber-500 px-6 py-12 text-center text-white shadow-lg">
        <h1 className="text-3xl font-bold sm:text-4xl">Ne pişirsek?</h1>
        <p className="mx-auto mt-2 max-w-md text-orange-50">
          Binlerce tarif arasından ara, favorilerine ekle, kendi tarifini kaydet.
        </p>
        <div className="mt-6">
          <SearchForm onSearch={handleSearch} />
        </div>
      </section>

      <div className="flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategory(cat)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeCat === cat
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-orange-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && <Spinner />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}
      {!loading && !error && meals.length === 0 && (
        <p className="py-10 text-center text-gray-500 dark:text-gray-400">
          Sonuç bulunamadı. Farklı bir arama deneyin.
        </p>
      )}
      {!loading && !error && meals.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {meals.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
}
