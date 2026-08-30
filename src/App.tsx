import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import Favorites from './pages/Favorites';
import AddRecipe from './pages/AddRecipe';
import About from './pages/About';

// Uygulamanın kökü: Context sağlayıcıları + Router + sayfa yönlendirmeleri.
export default function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
            <Navbar />
            <main className="mx-auto max-w-5xl px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tarif/:id" element={<RecipeDetail />} />
                <Route path="/favoriler" element={<Favorites />} />
                <Route path="/ekle" element={<AddRecipe />} />
                <Route path="/hakkinda" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-400 dark:border-gray-700">
              KUZEM React Final Projesi · Tarif Defteri
            </footer>
          </div>
        </BrowserRouter>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

function NotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">404</h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">Sayfa bulunamadı.</p>
    </div>
  );
}
