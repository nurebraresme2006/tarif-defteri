# 🍳 Tarif Defteri — KUZEM React Final Projesi

Kurs boyunca öğrenilen tüm React + TypeScript yapılarını (Router, Context, custom hook, dış API, form/validasyon, Tailwind, hata yönetimi, localStorage) tek bir bağımsız uygulamada bir araya getiren tarif uygulaması.

Kullanıcı tarif arayabilir, kategorilere göz atabilir, tarif detayını görüntüleyebilir, beğendiklerini favorilere ekleyebilir ve kendi tarifini kaydedebilir. Favoriler, tema ve kendi tarifler sayfa yenilense de kalıcı kalır.

## 🚀 Nasıl Çalıştırılır?

```bash
npm install     # bağımlılıkları kur
npm run dev     # geliştirme sunucusunu başlat (http://localhost:5173)
npm run build   # production derlemesi (hata kontrolü + build)
npm run preview # derlenmiş sürümü önizle
```

## 🧩 Kullanılan Teknolojiler

- **React 18 + TypeScript**
- **Vite** (proje kurulumu ve derleme)
- **React Router DOM** (sayfa yönlendirme)
- **TailwindCSS** (responsive tasarım, açık/koyu tema)
- **TheMealDB API** (ücretsiz, anahtarsız tarif API'si)

## 📋 Gereksinim Karşılığı

| # | Gereksinim | Nerede |
|---|------------|--------|
| 1 | Vite + React + TypeScript | Proje kurulumu |
| 2 | Router: 3+ sayfa, 1 dinamik route | `App.tsx` — `/`, `/favoriler`, `/ekle`, `/hakkinda`, `/tarif/:id` |
| 3 | Context ile global state | `ThemeContext` (tema) + `FavoritesContext` (favoriler) |
| 4 | Kendi yazdığın custom hook | `useFetch`, `useLocalStorage` |
| 5 | Dış API'den veri çekme | `useFetch` ile TheMealDB |
| 6 | Validasyonlu form | `SearchForm` + `AddRecipe` (tarif ekleme formu) |
| 7 | TailwindCSS responsive arayüz | Tüm bileşenler |
| 8 | Loading + hata + tekrar dene | `Spinner`, `ErrorMessage` |
| 9 | localStorage ile kalıcı veri | Favoriler, tema, kendi tarifler |

## 📁 Klasör Yapısı

```
src/
├── components/   # Navbar, RecipeCard, SearchForm, Spinner, ErrorMessage
├── context/      # ThemeContext, FavoritesContext
├── hooks/        # useFetch, useLocalStorage
├── pages/        # Home, RecipeDetail, Favorites, AddRecipe, About
├── App.tsx       # Router + Provider'lar
├── main.tsx      # Giriş noktası
└── types.ts      # TypeScript tipleri
```

## 📸 Ekran Görüntüsü

<!-- Buraya deploy edilmiş uygulamanızdan bir ekran görüntüsü ekleyin.
     Örn: ![Ana Sayfa](./screenshot.png) -->

## 🔗 Canlı Demo

<!-- Vercel deploy linkinizi buraya yapıştırın -->
