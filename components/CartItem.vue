<script setup lang="ts">
import { type PRODUCT } from '~~/server/api/products';
import { useCartStore } from '@/stores/cart';

type PROPS = {
  product: PRODUCT;
};
const { product } = defineProps<PROPS>();

const { priceLocale } = usePriceLocale();

const store = useCartStore();
const removeProduct = (product) => {
  store.removeProduct(product);
};
const increase = (product) => {
  store.increase(product);
};
const decrease = (product) => {
  store.decrease(product);
};
</script>

<template>
  <div class="card card-side">
    <div class="card-body pl-0">
      <h2 class="card-title">{{ product.name }}</h2>

      <p class="opacity-60">{{ product.description }}</p>

      <div>
        <span class="text-xl font-bold mr-4">
          {{ priceLocale(product.price.unit_amount) }}
        </span>

        <span>In Stock</span>
      </div>

      <div class="card-actions">
        <div class="form-control">
          <div class="input-group">
            <button class="btn btn-square" @click="decrease(product)">
              <span class="material-icons bg-transparent"> remove </span>
            </button>

            <div class="input input-bordered leading-10">
              {{ product.quantity }}
            </div>

            <button class="btn btn-square" @click="increase(product)">
              <span class="material-icons bg-transparent"> add </span>
            </button>
          </div>
        </div>

        <button class="btn btn-square" @click="removeProduct(product)">
          <span class="material-icons bg-transparent"> delete </span>
        </button>
      </div>
    </div>

    <figure class="min-w-fit md:min-w-[30%]">
      <img
        :src="`https://api.lorem.space/image/shoes?w=100&h=100&hash=${product.id}`"
        alt="Shoes"
      />
    </figure>
  </div>
</template>
