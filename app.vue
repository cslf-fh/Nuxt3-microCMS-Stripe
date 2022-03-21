<script setup lang="ts">
const nuxtApp = useNuxtApp();
const loading = ref();

nuxtApp.hook('page:start', () => {
  loading.value.start();
});
nuxtApp.hook('page:finish', () => {
  loading.value.finish();
  window.scrollTo(0, 0);
});

const { theme } = useTheme();

useMeta({
  link: [
    {
      href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
      rel: 'stylesheet',
    },
  ],
});
</script>

<template>
  <Html :data-theme="theme"></Html>
  <Header />
  <LoadingPages ref="loading" />
  <CartAlert />
  <main class="container mx-auto p-4 mt-16 mb-16 md:mb-0">
    <NuxtPage />
  </main>
  <BottomNavigation />
</template>
