import {
  InjectStripeClient,
  StripeWebhookHandler,
} from '@golevelup/nestjs-stripe';
import { Injectable } from '@nestjs/common';
import { STRIPE_PRICE_API_ID } from 'src/.env';
import { generateAPIKey } from 'src/helpers';
import Stripe from 'stripe';

type CheckoutSessionCompleteResult = {
  hashedAPIKey: string;
  subscriptionItemId: string;
  customerId: string;
};

@Injectable()
export class PaymentService {
  constructor(@InjectStripeClient() private stripeClient: Stripe) {}

  //   @StripeWebhookHandler('payment_intent.created')
  //   handlePaymentIntentCreated(evt: Stripe.PaymentIntentCreateParams) {
  //     // execute your custom business logic
  //     console.log(evt.amount);
  //   }

  @StripeWebhookHandler('checkout.session.completed')
  async handleCheckoutSessionCompleted(
    event: any,
  ): Promise<CheckoutSessionCompleteResult> {
    // TODO: Maybe Stripe Webhook Handler must be setted on the controller (?)
    if (event.type != 'checkout.session.completed') return;
    // Data included in the event object:

    const data = event.data;
    const subscriptionId = data.object.subscription;
    const customerId = data.object.customer;

    // Get the subscription. The first item is the plan the user subscribed to.
    const subscription = await this.stripeClient.subscriptions.retrieve(
      subscriptionId,
    );
    const subscriptionItemId = subscription.items.data[0].id;
    // Generate API key
    const { hashedAPIKey, apiKey } = generateAPIKey();
    console.log({ apiKey });
    return { hashedAPIKey, subscriptionItemId, customerId };
  }

  async checkout() {
    const session = await this.stripeClient.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: STRIPE_PRICE_API_ID,
        },
      ],
      // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
      // the actual Session ID is returned in the query parameter when your customer
      // is redirected to the success page.
      success_url:
        'http://localhost:5000/dashboard?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5000/payment-error',
    });
    return session;
  }

  async incrementUsage(subscriptionItemId: string) {
    return await this.stripeClient.subscriptionItems.createUsageRecord(
      subscriptionItemId,
      {
        quantity: 1,
        timestamp: 'now',
        action: 'increment',
      },
    );
  }

  async getUsage(subscriptionItemId: string) {
    return await this.stripeClient.subscriptionItems.listUsageRecordSummaries(
      subscriptionItemId,
    );
  }
}
