import { defineNuxtConfig } from 'nuxt3';

const { BASE_URL, MICROCMS_BASE_URL, MICROCMS_API_KEY, STRIPE_SECRET_KEY } =
  process.env;

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  buildModules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  tailwindcss: {
    exposeConfig: true,
  },
  publicRuntimeConfig: {
    baseUrl: BASE_URL,
    microcmsBaseUrl: MICROCMS_BASE_URL,
    microcmsApiKey: MICROCMS_API_KEY,
    stripeSecretKey: STRIPE_SECRET_KEY,
  },
  privateRuntimeConfig: {
    baseUrl: process.env.NODE_ENV !== 'production' ? BASE_URL : undefined,
    microcmsApiKey:
      process.env.NODE_ENV !== 'production' ? MICROCMS_API_KEY : undefined,
    stripeSecretKey:
      process.env.NODE_ENV !== 'production' ? STRIPE_SECRET_KEY : undefined,
  },
});
