<script setup lang="ts">
const route = useRoute();
const path = route.path.replace('/', '');
</script>

<template>
  <div class="text-sm breadcrumbs">
    <ul>
      <li>
        <NuxtLink to="/">Home</NuxtLink>
      </li>
      <li class="opacity-60">{{ path }}</li>
    </ul>
  </div>
</template>
