import { InjectStripeClient } from '@golevelup/nestjs-stripe';
import { Injectable } from '@nestjs/common';
import { STRIPE_PRICE_API_ID } from 'src/constants';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  constructor(@InjectStripeClient() private stripeClient: Stripe) {}

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
}
