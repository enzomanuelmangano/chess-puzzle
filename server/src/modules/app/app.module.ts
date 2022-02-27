import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PuzzleModule } from '../puzzle/puzzle.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentModule } from '../payment/payment.module';
import { applyRawBodyOnlyTo } from '@golevelup/nestjs-webhooks';

@Module({
  imports: [PuzzleModule, TypeOrmModule.forRoot(), PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // from: https://github.com/golevelup/nestjs/tree/master/packages/stripe
  // By default, NestJS is configured to use JSON body parsing middleware which
  // will transform the request before it can be validated by the Stripe library.
  // The easiest solution is to also include the @golevelup/nestjs-webhooks
  // package and follow the steps for setting up simple body parsing.
  configure(consumer: MiddlewareConsumer) {
    applyRawBodyOnlyTo(consumer, {
      method: RequestMethod.ALL,
      path: 'payment/webhook',
    });
  }
}
