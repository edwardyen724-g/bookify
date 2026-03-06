import { defineConfig } from 'next';

export default defineConfig({
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['your-image-domain.com'], // Add your allowed image domains here
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
  eslint: {
    dirs: ['src'], // Only run ESLint on the "src" directory during production builds
  },
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
});