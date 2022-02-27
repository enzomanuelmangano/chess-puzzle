import {
  InjectStripeClient,
  StripeWebhookHandler,
} from '@golevelup/nestjs-stripe';
import { Injectable } from '@nestjs/common';
import { generateAPIKey } from 'src/helpers';
import Stripe from 'stripe';

// stripe listen --forward-to localhost:3000/payment/webhook
@Injectable()
export class PaymentHandlerService {
  constructor(@InjectStripeClient() private stripeClient: Stripe) {}

  //   @StripeWebhookHandler('payment_intent.created')
  //   handlePaymentIntentCreated(evt: Stripe.PaymentIntentCreateParams) {
  //     // execute your custom business logic
  //     console.log(evt.amount);
  //   }

  @StripeWebhookHandler('checkout.session.completed')
  async handleCheckoutSessionCompleted(event: any) {
    // TODO: Maybe Stripe Webhook Handler must be setted on the controller (?)
    if (event.type != 'checkout.session.completed') return;
    // Data included in the event object:
    console.log({ event });
    const data = event.data;
    const subscriptionId = data.object.subscription;
    const customerId = data.object.customer;

    console.log(
      `💰 Customer ${customerId} subscribed to plan ${subscriptionId}`,
    );

    // Get the subscription. The first item is the plan the user subscribed to.
    const subscription = await this.stripeClient.subscriptions.retrieve(
      subscriptionId,
    );
    console.log(subscription);
    const itemId = subscription.items.data[0].id;
    console.log(itemId);
    // Generate API key
    const { apiKey, hashedAPIKey } = generateAPIKey();
    console.log(`User's API Key: ${apiKey}`);
    console.log(`Hashed API Key: ${hashedAPIKey}`);

    // Store the API key in your database.
    // customers[customerId] = {
    //   apikey: hashedAPIKey,
    //   itemId,
    //   active: true,
    // };
    // apiKeys[hashedAPIKey] = customerId;
  }
}
