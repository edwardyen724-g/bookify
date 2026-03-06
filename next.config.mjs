import { defineConfig } from 'next';
import { withTailwindCss } from 'next-tailwindcss';

export default defineConfig(withTailwindCss({
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverActions: true,
  },
  env: {
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
  },
  images: {
    domains: ['your-image-domain.com'], // Update with allowed domains for images
  },
}));