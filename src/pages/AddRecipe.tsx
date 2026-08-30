import { useState, FormEvent } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { CustomRecipe } from '../types';

interface FormErrors {
  name?: string;
  category?: string;
  ingredients?: string;
  instructions?: string;
}

// Tarif ekleme sayfası: validasyonlu form + localStorage'da kalıcı liste (ekle/sil).
export default function AddRecipe() {
  const [recipes, setRecipes] = useLocalStorage<CustomRecipe[]>(
    'tarif-kendi',
    []
  );
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!name.trim()) e.name = 'Tarif adı zorunludur.';
    if (!category.trim()) e.category = 'Kategori zorunludur.';
    if (ingredients.trim().length < 3) e.ingredients = 'Malzemeleri yazın.';
    if (instructions.trim().length < 10)
      e.instructions = 'Hazırlanışı en az 10 karakter olmalı.';
    return e;
  };

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setSuccess(false);
      return;
    }
    const newRecipe: CustomRecipe = {
      id: crypto.randomUUID(),
      name: name.trim(),
      category: category.trim(),
      ingredients: ingredients.trim(),
      instructions: instructions.trim(),
    };
    setRecipes((prev) => [newRecipe, ...prev]);
    setName('');
    setCategory('');
    setIngredients('');
    setInstructions('');
    setErrors({});
    setSuccess(true);
  };

  const remove = (id: string) =>
    setRecipes((prev) => prev.filter((r) => r.id !== id));

  const inputClass =
    'w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100';
  const labelClass =
    'mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300';

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100">
        Kendi Tarifini Ekle
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label className={labelClass}>Tarif Adı</label>
          <input
            className={inputClass}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>Kategori</label>
          <input
            className={inputClass}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          {errors.category && (
            <p className="mt-1 text-sm text-red-500">{errors.category}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>Malzemeler</label>
          <textarea
            className={inputClass}
            rows={3}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          {errors.ingredients && (
            <p className="mt-1 text-sm text-red-500">{errors.ingredients}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>Hazırlanışı</label>
          <textarea
            className={inputClass}
            rows={5}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
          {errors.instructions && (
            <p className="mt-1 text-sm text-red-500">{errors.instructions}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-orange-600 px-6 py-3 font-medium text-white transition hover:bg-orange-700"
        >
          Tarifi Kaydet
        </button>
        {success && (
          <p className="text-center text-sm font-medium text-green-600 dark:text-green-400">
            ✓ Tarif kaydedildi!
          </p>
        )}
      </form>

      {recipes.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
            Eklediğim Tarifler ({recipes.length})
          </h2>
          <ul className="space-y-3">
            {recipes.map((r) => (
              <li
                key={r.id}
                className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                      {r.name}
                    </h3>
                    <p className="text-xs font-medium text-orange-500">
                      {r.category}
                    </p>
                  </div>
                  <button
                    onClick={() => remove(r.id)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Sil
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Malzemeler:</span>{' '}
                  {r.ingredients}
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Hazırlanışı:</span>{' '}
                  {r.instructions}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
