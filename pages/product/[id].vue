<script setup lang="ts">
import { type PRODUCT } from '~~/server/api/products';
import { useCartStore } from '~~/stores/cart';

const route = useRoute();
const paramsId = route.params.id;

const { data: product } = await useFetch<PRODUCT>('/api/products', {
  params: { id: paramsId },
});

const { priceLocale } = usePriceLocale();
const { toggleAlert } = useCartAlert();

const store = useCartStore();
const addProduct = (product) => {
  store.addProduct(product);
  toggleAlert();
};
</script>

<template>
  <div>
    <Breadcrumbs />

    <h1 class="mb-4 text-5xl font-bold">{{ product.name }}</h1>

    <div class="md:grid md:grid-cols-2 md:gap-4">
      <div>
        <figure class="mb-4">
          <img
            class="w-full"
            src="https://api.lorem.space/image/shoes"
            alt="Shoes"
          />
        </figure>

        <div class="carousel carousel-center space-x-4 mb-4">
          <div v-for="(i, key) in 5" :key="key" class="carousel-item">
            <img
              :src="`https://api.lorem.space/image/shoes?w=100&h=100&hash=${i}`"
              alt="Shoes"
            />
          </div>
        </div>
      </div>

      <div>
        <div tabindex="0" class="collapse collapse-arrow md:collapse-open">
          <input type="checkbox" class="md:hidden" />

          <div class="collapse-title text-xl font-medium">Description</div>

          <div class="collapse-content">
            <p>{{ product.description }}</p>
          </div>
        </div>

        <div class="divider"></div>

        <div class="flex justify-between mb-4 px-4">
          <p class="text-xl font-bold">
            {{ priceLocale(product.price.unit_amount) }}
          </p>

          <Rating :id="product.id" :star="product.star" count />
        </div>

        <button class="btn btn-primary btn-block" @click="addProduct(product)">
          Add to cart
        </button>
      </div>
    </div>

    <h2 class="text-center text-3xl mt-40 mb-8">
      We found other products you might like
    </h2>

    <div class="carousel carousel-center space-x-4 mb-4">
      <div
        v-for="(i, key) in 5"
        :key="key"
        :id="`item${i}`"
        class="carousel-item"
      >
        <img
          :src="`https://api.lorem.space/image/shoes?w=400&h=400&hash=${i}`"
          alt="Shoes"
        />
      </div>
    </div>

    <div class="flex justify-center w-full py-2 gap-2">
      <a
        v-for="(i, key) in 5"
        :key="key"
        :href="`#item${i}`"
        class="btn btn-xs"
      >
        {{ i }}
      </a>
    </div>
  </div>
</template>
