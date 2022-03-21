<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCartStore } from '@/stores/cart';

const store = useCartStore();
const { getProductQuantity } = storeToRefs(store);
</script>

<template>
  <div>
    <Breadcrumbs />

    <h1 class="mb-4 text-5xl font-bold">Cart</h1>

    <p class="mb-4">
      {{ getProductQuantity ? `${getProductQuantity} Items` : 'No Items' }}
    </p>

    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-2 mb-4">
        <div class="grid grid-cols-1 gap-4">
          <CartItem
            v-for="(product, key) in store.rawProducts"
            :key="key"
            :product="product"
          />

          <div class="divider md:hidden"></div>
        </div>
      </div>

      <NuxtLink
        to="/checkout"
        class="btn btn-primary btn-block md:sticky md:top-20"
        :disabled="!getProductQuantity ? true : null"
      >
        Go To Checkout
      </NuxtLink>
    </div>
  </div>
</template>
