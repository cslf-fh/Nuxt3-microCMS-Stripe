<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCartStore } from '@/stores/cart';

const { themes, changeTheme } = useTheme();

const store = useCartStore();
const { getTotalQuantity } = storeToRefs(store);
</script>

<template>
  <header class="navbar bg-base-100 shadow-md fixed top-0 z-50">
    <div class="navbar-start">
      <NuxtLink to="/" class="btn btn-ghost md:text-xl">
        Nuxt3 microCMS Stripe
      </NuxtLink>
    </div>

    <div class="navbar-end">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost gap-2">
          <span class="material-icons"> style </span>

          <span class="hidden md:block">Change theme</span>

          <span class="material-icons"> expand_more </span>
        </label>

        <div
          class="dropdown-content bg-base-200 text-base-content rounded-t-box rounded-b-box top-px h-96 w-40 overflow-y-auto shadow-2xl mt-12 border border-base-content border-opacity-5"
        >
          <ul tabindex="0" class="menu menu-compat p-2">
            <li v-for="(i, key) in themes" :key="key">
              <a @click="changeTheme(i)">{{ i }}</a>
            </li>
          </ul>
        </div>
      </div>

      <nav class="hidden md:contents">
        <ul class="flex">
          <li>
            <NuxtLink to="/search" class="btn btn-circle btn-ghost">
              <span class="material-icons"> search </span>
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

              <span class="material-icons"> shopping_cart </span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
