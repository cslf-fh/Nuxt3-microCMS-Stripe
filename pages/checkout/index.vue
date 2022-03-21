<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCartStore } from '@/stores/cart';

const store = useCartStore();
const { getTotalAmount, stripeLineItems } = storeToRefs(store);

const { priceLocale } = usePriceLocale();
const agreeCheckout = ref(false); // チェックアウトボタンの表示制御

const checkout = async () => {
  if (!agreeCheckout.value) return;
  const session = await $fetch('/api/checkout_session', {
    method: 'POST', // リクエスト先でuseBodyを使うので'POST'を指定
    body: { lineItems: stripeLineItems.value },
  });
  window.open(session.url, '_self'); // Stripe決済用のページを開く
};

definePageMeta({
  middleware: ['checkout'],
});
</script>

<template>
  <div>
    <Breadcrumbs />

    <h1 class="mb-4 text-5xl font-bold">Checkout</h1>

    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-2 mb-4">
        <div class="grid grid-cols-1 gap-4">
          <CheckoutItem
            v-for="(product, key) in store.rawProducts"
            :key="key"
            :product="product"
          />
          <div class="divider md:hidden"></div>
        </div>
      </div>

      <div>
        <div class="md:sticky md:top-20">
          <div class="grid grid-cols-2 gap-2 mb-4">
            <p>Subtotal:</p>
            <p class="text-right font-bold">
              {{ priceLocale(getTotalAmount) }}
            </p>
            <p>Shipping & Handling:</p>
            <p class="text-right font-bold">{{ priceLocale(0) }}</p>
            <p>Discunt:</p>
            <p class="text-right font-bold">{{ priceLocale(0) }}</p>
            <p>Grand total:</p>
            <p class="text-right font-bold">
              {{ priceLocale(getTotalAmount) }}
            </p>
          </div>

          <div class="divider"></div>

          <div class="form-control mb-4">
            <label class="label cursor-pointer justify-start">
              <input v-model="agreeCheckout" type="checkbox" class="checkbox" />

              <span class="label-text ml-4">Agree to checkout</span>
            </label>
          </div>
          <button
            class="btn btn-primary btn-block"
            :disabled="!agreeCheckout ? true : null"
            @click="checkout"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
