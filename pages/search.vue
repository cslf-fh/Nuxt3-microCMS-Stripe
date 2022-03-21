<script setup lang="ts">
import { type PRODUCT } from '~~/server/api/products';

const { data: products } = await useFetch<PRODUCT[]>('/api/products');

const searchWord = useState('searchWord', () => ''); // 検索語句
const { searchItems } = useSearchItems();
</script>

<template>
  <div>
    <Breadcrumbs />
    <h1 class="mb-4 text-5xl font-bold">Search</h1>
    <div class="form-control mb-4">
      <div class="input-group">
        <span class="material-icons">search</span>

        <input
          v-model="searchWord"
          type="text"
          placeholder="Search products"
          class="input input-bordered w-full"
        />

        <button
          v-if="searchWord"
          class="btn btn-square"
          @click="searchWord = ''"
        >
          <span class="material-icons bg-transparent">close</span>
        </button>
      </div>
    </div>
    <p class="mb-4">
      {{
        searchItems(products, searchWord).length
          ? `Results: ${searchItems(products, searchWord).length} Items`
          : 'No results'
      }}
    </p>
    <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      <CardItem
        v-for="(product, key) in searchItems(products, searchWord)"
        :key="key"
        :product="product"
      />
    </div>
  </div>
</template>
