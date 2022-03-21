<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCartStore } from '@/stores/cart';

const store = useCartStore();
const { getTotalQuantity } = storeToRefs(store);
</script>

<template>
  <footer class="md:hidden">
    <nav class="px-4 py-2 bg-base-100 fixed bottom-0 inset-x-0">
      <ul class="flex justify-evenly">
        <li>
          <NuxtLink to="/" class="btn btn-circle btn-ghost">
            <span class="material-icons text-4xl"> home </span>
          </NuxtLink>
        </li>

        <li>
          <NuxtLink to="/search" class="btn btn-circle btn-ghost">
            <span class="material-icons text-4xl"> search </span>
          </NuxtLink>
        </li>

        <li>
          <NuxtLink to="/cart" class="relative btn btn-circle btn-ghost">
            <span
              v-if="getTotalQuantity"
              class="absolute top-0 right-0 indicator-item badge badge-primary"
            >
              {{ getTotalQuantity }}
            </span>

            <span class="material-icons text-4xl"> shopping_cart </span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </footer>
</template>
