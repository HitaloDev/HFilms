import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

export default getRequestConfig(async () => {
  const userHeaders = headers();
  let locale = userHeaders.get('accept-language')?.split(',')[0].split('-')[0] || 'pt';

  const supportedLocales = ['en', 'es', 'pt'];
  if (!supportedLocales.includes(locale)) {
    locale = 'pt';
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});