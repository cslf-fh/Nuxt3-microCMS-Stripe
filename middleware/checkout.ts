import { storeToRefs } from 'pinia';
import { useCartStore } from '~~/stores/cart';

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useCartStore();
  const { getProductQuantity } = storeToRefs(store);

  if (getProductQuantity.value < 1) return navigateTo('/'); // カートに商品が入っていない時はリダイレクト
});
