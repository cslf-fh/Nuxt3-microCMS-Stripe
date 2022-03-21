<script setup lang="ts">
import { type PRODUCT } from '~~/server/api/products';
import { useCartStore } from '@/stores/cart';

type PROPS = {
  product: PRODUCT;
};
const { product } = defineProps<PROPS>();

const { toggleAlert } = useCartAlert();
const { priceLocale } = usePriceLocale();

const store = useCartStore();
const addProduct = (product) => {
  store.addProduct(product);
  toggleAlert();
};
</script>

<template>
  <div class="card card-compact justify-between shadow-xl md:card-normal">
    <NuxtLink :to="`/product/${product.id}`">
      <figure>
        <img
          :src="`https://api.lorem.space/image/shoes?w=300&h=300&hash=${product.id}`"
          alt="Shoes"
        />
      </figure>

      <div class="card-body">
        <div class="grid grid-cols-1 gap-2">
          <h2 class="card-title">{{ product.name }}</h2>

          <span class="card-title">
            {{ priceLocale(product.price.unit_amount) }}
          </span>

          <Rating :id="product.id" :star="product.star" count />
        </div>
      </div>
    </NuxtLink>

    <div class="card-actions justify-end pr-4 pb-4 md:pr-8 md:pb-8">
      <button class="btn btn-primary" @click="addProduct(product)">
        Add cart
      </button>
    </div>
  </div>
</template>
