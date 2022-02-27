import { StripeModule } from '@golevelup/nestjs-stripe';
import { Module } from '@nestjs/common';
import { STRIPE_PRIVATE_API_KEY, STRIPE_WEBHOOK_SECRET } from 'src/.env';
import { PaymentHandlerService } from './payment-created.service';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [
    StripeModule.forRoot(StripeModule, {
      apiKey: STRIPE_PRIVATE_API_KEY,
      webhookConfig: {
        stripeWebhookSecret: STRIPE_WEBHOOK_SECRET,
      },
    }),
  ],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentHandlerService],
})
export class PaymentModule {}
