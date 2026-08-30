interface Props {
  message: string;
  onRetry?: () => void;
}

// Hata durumunda anlamlı mesaj ve "tekrar dene" seçeneği gösterir.
export default function ErrorMessage({ message, onRetry }: Props) {
  return (
    <div className="mx-auto my-10 max-w-md rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900 dark:bg-red-950">
      <p className="mb-1 text-lg font-semibold text-red-700 dark:text-red-300">
        Bir şeyler ters gitti
      </p>
      <p className="mb-4 text-sm text-red-600 dark:text-red-400">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
        >
          Tekrar dene
        </button>
      )}
    </div>
  );
}
