// Hakkında sayfası: projenin karşıladığı gereksinimleri özetler.
export default function About() {
  const features = [
    'React Router ile çok sayfalı yapı ve dinamik tarif detay sayfası (/tarif/:id)',
    'Context API ile tema (açık/koyu) ve favori yönetimi (global state)',
    'useFetch ve useLocalStorage adında iki özel (custom) hook',
    'TheMealDB API’sinden canlı veri çekme',
    'Doğrulamalı (validasyonlu) tarif ekleme formu',
    'TailwindCSS ile responsive tasarım (mobil + masaüstü)',
    'Yükleniyor (spinner) / hata mesajı / “tekrar dene” deneyimi',
    'localStorage ile kalıcı favoriler, tema ve kendi tariflerin',
  ];

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-100">
        Hakkında
      </h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Bu uygulama, KUZEM React Eğitimi final projesi kapsamında geliştirilmiştir.
        Amacı, kurs boyunca öğrenilen tüm temel React + TypeScript yapılarını tek
        bir üründe bir araya getirmektir.
      </p>
      <h2 className="mb-3 text-lg font-semibold text-gray-800 dark:text-gray-100">
        Öne çıkan özellikler
      </h2>
      <ul className="space-y-2">
        {features.map((f, i) => (
          <li key={i} className="flex gap-2 text-gray-700 dark:text-gray-300">
            <span className="text-orange-500">✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
