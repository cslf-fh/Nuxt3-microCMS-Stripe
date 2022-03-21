<script setup lang="ts">
import { type PRODUCT } from '~~/server/api/products';

const { data: products } = await useFetch<PRODUCT[]>('/api/products');

const { sortItems } = useSortItems();
</script>

<template>
  <div>
    <h1 class="mb-4 text-5xl font-bold">Featured</h1>
    <div class="flex justify-between items-center mb-4">
      <p>{{ `${products.length} Items insted` }}</p>
      <div>
        <label
          tabindex="0"
          class="btn btn-ghost btn-sm gap-2 md:btn-md"
          @click="sortItems(products, 'reverse')"
        >
          <span class="material-icons"> import_export </span>
          <span>Reverse</span>
        </label>
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-sm gap-2 md:btn-md">
            <span class="material-icons"> sort </span>
            Sort
          </label>
          <div
            class="dropdown-content bg-base-200 text-base-content rounded-t-box rounded-b-box top-px w-24 shadow-2xl mt-12 border border-base-content border-opacity-5"
          >
            <ul tabindex="0" class="menu menu-compat p-2">
              <li>
                <a @click="sortItems(products, 'price')">price</a>
              </li>
              <li>
                <a @click="sortItems(products, 'star')">star</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      <CardItem
        v-for="(product, key) in products"
        :key="key"
        :product="product"
      />
    </div>
  </div>
</template>
