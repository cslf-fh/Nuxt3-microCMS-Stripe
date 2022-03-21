<script setup lang="ts">
import { type PRODUCT } from '~~/server/api/products';

type PROPS = {
  product: PRODUCT;
};
const { product } = defineProps<PROPS>();

const { priceLocale } = usePriceLocale();
</script>

<template>
  <div class="card card-side">
    <div class="card-body pl-0">
      <h2 class="card-title pl-2 md:pl-4">{{ product.name }}</h2>

      <div class="overflow-x-auto">
        <table class="table table-compact w-full md:table-normal">
          <thead>
            <tr>
              <th>Price</th>
              <th>Qty</th>
              <th>In total</th>
            </tr>
          </thead>

          <tbody>
            <tr class="hover">
              <td>{{ priceLocale(product.price.unit_amount) }}</td>
              <td>{{ product.quantity }}</td>
              <td>
                {{ priceLocale(product.price.unit_amount * product.quantity) }}
              </td>
            </tr>
          </tbody>
        </table>
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
