import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  public insert(
    customer:
      | QueryDeepPartialEntity<Customer>
      | QueryDeepPartialEntity<Customer>[],
  ) {
    return this.customerRepository.insert(customer);
  }

  public findBy(key: string) {
    return this.customerRepository.findOne({ key });
  }
}
