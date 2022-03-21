import { defineNuxtConfig } from 'nuxt3';

const { MICROCMS_BASE_URL, MICROCMS_API_KEY, STRIPE_SECRET_KEY } = process.env;

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  buildModules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  tailwindcss: {
    exposeConfig: true,
  },
  publicRuntimeConfig: {
    baseUrl: 'http://localhost:3000',
    microcmsBaseUrl: MICROCMS_BASE_URL,
    microcmsApiKey: MICROCMS_API_KEY,
    stripeSecretKey: STRIPE_SECRET_KEY,
  },
  privateRuntimeConfig: {
    baseUrl:
      process.env.NODE_ENV !== 'production'
        ? 'http://localhost:3000'
        : undefined,
    microcmsApiKey:
      process.env.NODE_ENV !== 'production' ? MICROCMS_API_KEY : undefined,
    stripeSecretKey:
      process.env.NODE_ENV !== 'production' ? STRIPE_SECRET_KEY : undefined,
  },
});
