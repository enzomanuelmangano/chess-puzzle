import { Body, Controller, Get, Post } from '@nestjs/common';
import Stripe from 'stripe';
import { PaymentHandlerService } from './payment-created.service';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly paymentHandlerService: PaymentHandlerService,
  ) {}

  @Get('checkout')
  async checkout() {
    return await this.paymentService.checkout();
  }

  @Post('webhook')
  webhook(@Body() evt: Stripe.Event) {
    return this.paymentHandlerService.handleCheckoutSessionCompleted(
      evt as any,
    );
  }
}
