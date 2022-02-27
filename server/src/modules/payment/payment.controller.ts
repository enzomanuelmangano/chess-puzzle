import { Body, Controller, Get, Post } from '@nestjs/common';
import Stripe from 'stripe';
import { CustomerService } from '../customer/customer.service';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly customerService: CustomerService,
  ) {}

  @Get('checkout')
  async checkout() {
    return await this.paymentService.checkout();
  }

  @Post('webhook')
  async webhook(@Body() evt: Stripe.Event) {
    const checkoutResult =
      await this.paymentService.handleCheckoutSessionCompleted(evt as any);

    if (!checkoutResult) return;
    const {
      // hashedAPIKey,
      apiKey,
      customerId: id,
      subscriptionItemId,
    } = checkoutResult;

    await this.customerService.insert({
      key: apiKey /* TODO: Passed hashedAPIKey */,
      id,
      subscriptionItemId,
      active: true,
    });
  }
}
