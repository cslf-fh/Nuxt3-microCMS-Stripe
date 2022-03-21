import type { IncomingMessage, ServerResponse } from 'http';
import { useBody } from 'h3';
import Stripe from 'stripe';
import config from '#config';

export default async (req: IncomingMessage, res: ServerResponse) => {
  const stripe = new Stripe(config.stripeSecretKey, {
    apiVersion: '2020-08-27',
  });

  const body = await useBody(req);
  const { lineItems } = body; // カート内の商品情報

  // StripeのCheckoutセッションの作成
  const session = await stripe.checkout.sessions.create({
    customer_creation: 'if_required',
    line_items: lineItems,
    mode: 'payment',
    success_url: `${config.baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`, // セッションIDを使用して顧客情報等を取得する
    cancel_url: `${config.baseUrl}/checkout/cancel`,
  });

  return session;
};
