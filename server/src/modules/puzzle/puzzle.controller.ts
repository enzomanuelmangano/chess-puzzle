import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { hashAPIKey } from 'src/helpers';
import { CustomerService } from '../customer/customer.service';
import { PaymentService } from '../payment/payment.service';
import { GetPuzzleParams, PuzzleService } from './puzzle.service';

@Controller('puzzle')
export class PuzzleController {
  constructor(
    private readonly puzzleService: PuzzleService,
    private readonly customerService: CustomerService,
    private readonly paymentService: PaymentService,
  ) {}

  @Get()
  async getPuzzle(@Query() { apiKey }: GetPuzzleParams) {
    if (!apiKey) throw new BadRequestException();
    const result = this.puzzleService.getPuzzle();
    const customer = await this.customerService.findBy(hashAPIKey(apiKey));
    if (!customer) throw new BadRequestException();
    // TODO: increment usage asynchronously
    await this.paymentService.incrementUsage(customer.subscriptionItemId);
    return result;
  }

  @Get('usage')
  async getUsage(@Query() { apiKey }: GetPuzzleParams) {
    if (!apiKey) throw new BadRequestException();

    const customer = await this.customerService.findBy(hashAPIKey(apiKey));
    if (!customer) throw new BadRequestException();
    // TODO: increment usage asynchronously
    return await this.paymentService.getUsage(customer.subscriptionItemId);
  }
}
