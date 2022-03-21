import type { IncomingMessage, ServerResponse } from 'http';
import { useQuery } from 'h3';
import Stripe from 'stripe';
import config from '#config';

export interface API {
  contents: PRODUCT[];
  totalCount: number;
  offset: number;
  limit: number;
}
export interface PRODUCT {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
  description: string;
  stripe_price_id: string;
  price: PRICE;
  star: number;
  quantity?: number;
}
export interface PRICE {
  id: string;
  unit_amount: number;
  currency: string;
}

export default async (req: IncomingMessage, res: ServerResponse) => {
  const stripe = new Stripe(config.stripeSecretKey, {
    apiVersion: '2020-08-27',
  });

  const query = useQuery(req); // クエリの取得
  const id = query.id; // microCMSのコンテンツID
  const limit = query.limit || id ? 1 : 30; // 取得件数
  // IDの有無で全件取得か個別取得か切り替え
  const endpoint = id
    ? `/products/${id}?limit=${limit}`
    : `/products?limit=${limit}`;

  let products: PRODUCT | PRODUCT[];

  if (id) {
    // microCMSから商品情報を取得
    const contents = await $fetch<PRODUCT>(endpoint, {
      baseURL: config.microcmsBaseUrl,
      headers: {
        'X-MICROCMS-API-KEY': config.microcmsApiKey,
      },
    });

    const price = await stripe.prices.retrieve(contents.stripe_price_id); // microCMSのstripe料金IDからStripeの商品情報取得

    // microCMSから得た商品情報にStripeの商品情報を追加
    products = {
      ...contents,
      price: {
        id: price.id,
        unit_amount: price.unit_amount / 100,
        currency: price.currency,
      },
    };
  } else {
    const { contents } = await $fetch<API>(endpoint, {
      baseURL: config.microcmsBaseUrl,
      headers: {
        'X-MICROCMS-API-KEY': config.microcmsApiKey,
      },
    });

    products = await Promise.all(
      contents.map(async (elm: PRODUCT) => {
        const price = await stripe.prices.retrieve(elm.stripe_price_id);
        return {
          ...elm,
          price: {
            id: price.id,
            unit_amount: price.unit_amount / 100,
            currency: price.currency,
          },
        };
      })
    );
  }

  return products;
};
