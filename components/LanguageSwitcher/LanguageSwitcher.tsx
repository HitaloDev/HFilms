'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const changeLanguage = (lang: string) => {
    startTransition(() => {
      router.push('/', { locale: lang } as any);
    });
    alert('Language changed to ' + lang);
  };

  return (
    <div className="flex gap-2 p-4">
      <button
        className={`px-4 py-2 rounded ${isPending ? 'opacity-50' : ''}`}
        onClick={() => changeLanguage('pt')}
        disabled={isPending}
      >
        🇧🇷 Português
      </button>
      <button
        className={`px-4 py-2 rounded ${isPending ? 'opacity-50' : ''}`}
        onClick={() => changeLanguage('en')}
        disabled={isPending}
      >
        🇺🇸 English
      </button>
    </div>
  );
}