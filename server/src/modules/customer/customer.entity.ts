import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  subscriptionItemId: string;

  @Column()
  key: string;

  @Column()
  active: boolean;
}
