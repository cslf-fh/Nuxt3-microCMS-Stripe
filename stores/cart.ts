import { defineStore } from 'pinia';
import { type PRODUCT } from '~~/server/api/products';

export const useCartStore = defineStore({
  id: 'cart',
  state: () => ({
    rawProducts: [] as PRODUCT[],
  }),
  getters: {
    // カート内の商品の合計金額
    getTotalAmount(state) {
      // 商品毎の合計金額の配列を作成
      const totalForEach = state.rawProducts.map((elm) => {
        return elm.price.unit_amount * elm.quantity;
      });
      return totalForEach.reduce((prv, cr) => prv + cr, 0); // 配列内の金額を合算
    },

    // カート内の商品の個数
    getProductQuantity(state) {
      return state.rawProducts.length;
    },

    // カート内の商品の総数
    getTotalQuantity(state) {
      const totalForEach = state.rawProducts.map((elm) => {
        return elm.quantity;
      });
      return totalForEach.reduce((prv, cr) => prv + cr, 0);
    },

    // ストライプ決済用のカート内の商品の情報
    stripeLineItems(state) {
      return state.rawProducts.map((elm) => {
        return { price: elm.price.id, quantity: elm.quantity };
      });
    },
  },
  actions: {
    // カートに商品を追加
    addProduct(product) {
      const exist = this.rawProducts.find((elm) => elm.id === product.id); // カート内に商品があるかどうか
      if (exist) {
        exist.quantity++; // 商品がすでにあれば個数を加算
      } else {
        product.quantity = 1; // 個数のプロパティを追加
        this.rawProducts.push(product); // 商品を追加
      }
    },

    // カートから商品を削除
    removeProduct(product) {
      const index = this.rawProducts.indexOf(product);
      this.rawProducts.splice(index, 1);
    },

    // 個数の加算
    increase(product) {
      product.quantity++;
    },

    // 個数の減算
    decrease(product) {
      product.quantity > 1 ? product.quantity-- : null; // 個数が1個以上あれば減算
    },
  },
});
