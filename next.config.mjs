import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["image.tmdb.org"],
    },
    i18n: {
        locales: ['en', 'es', 'pt'],
        defaultLocale: 'pt',
      },
};

export default withNextIntl(nextConfig);