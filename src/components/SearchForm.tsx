import { useState, FormEvent } from 'react';

interface Props {
  onSearch: (term: string) => void;
  initialValue?: string;
}

// Arama formu: boş / çok kısa girdi kontrolü (validasyon) yapar.
export default function SearchForm({ onSearch, initialValue = '' }: Props) {
  const [term, setTerm] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = term.trim();
    if (trimmed.length === 0) {
      setError('Lütfen bir arama terimi girin.');
      return;
    }
    if (trimmed.length < 2) {
      setError('En az 2 karakter girmelisiniz.');
      return;
    }
    setError(null);
    onSearch(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-xl" noValidate>
      <div className="flex gap-2">
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Tarif ara (İngilizce: chicken, pasta, beef)..."
          className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
        />
        <button
          type="submit"
          className="rounded-xl bg-orange-600 px-6 py-3 font-medium text-white transition hover:bg-orange-700"
        >
          Ara
        </button>
      </div>
      {error && (
        <p className="mt-2 text-left text-sm font-medium text-red-100">{error}</p>
      )}
    </form>
  );
}
