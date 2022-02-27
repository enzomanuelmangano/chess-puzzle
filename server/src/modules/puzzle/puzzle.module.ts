import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from '../customer/customer.module';
import { PaymentModule } from '../payment/payment.module';
import { PuzzleController } from './puzzle.controller';
import { Puzzle } from './puzzle.entity';
import { PuzzleService } from './puzzle.service';

@Module({
  imports: [TypeOrmModule.forFeature([Puzzle]), PaymentModule, CustomerModule],
  controllers: [PuzzleController],
  providers: [PuzzleService],
})
export class PuzzleModule {}
