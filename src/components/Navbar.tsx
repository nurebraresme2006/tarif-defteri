import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../context/FavoritesContext';

// Üst menü: sayfa linkleri, favori sayacı ve tema değiştirme butonu.
export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { favorites } = useFavorites();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive
        ? 'bg-orange-500 text-white'
        : 'text-gray-600 hover:bg-orange-100 dark:text-gray-300 dark:hover:bg-gray-700'
    }`;

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-700 dark:bg-gray-900/80">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-lg font-bold text-orange-600 dark:text-orange-400"
        >
          🍳 Tarif Defteri
        </NavLink>
        <div className="flex flex-wrap items-center gap-1">
          <NavLink to="/" className={linkClass} end>
            Ana Sayfa
          </NavLink>
          <NavLink to="/favoriler" className={linkClass}>
            Favoriler{favorites.length > 0 && ` (${favorites.length})`}
          </NavLink>
          <NavLink to="/ekle" className={linkClass}>
            Tarif Ekle
          </NavLink>
          <NavLink to="/hakkinda" className={linkClass}>
            Hakkında
          </NavLink>
          <button
            onClick={toggleTheme}
            aria-label="Temayı değiştir"
            className="ml-1 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </nav>
    </header>
  );
}
