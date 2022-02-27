import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
