import { StripeModule } from '@golevelup/nestjs-stripe';
import { Module } from '@nestjs/common';
import { STRIPE_PRIVATE_API_KEY, STRIPE_WEBHOOK_SECRET } from 'src/.env';

import { CustomerModule } from '../customer/customer.module';

import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [
    CustomerModule,
    StripeModule.forRoot(StripeModule, {
      apiKey: STRIPE_PRIVATE_API_KEY,
      webhookConfig: {
        stripeWebhookSecret: STRIPE_WEBHOOK_SECRET,
      },
    }),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
