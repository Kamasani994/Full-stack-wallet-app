import { ColumnNumericTransformer } from 'src/classes/ColumnNumericTransformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Wallet } from '../wallet/wallet.entity';

export enum TransactionType {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

@Entity('transaction', { schema: 'wallet' })
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Wallet)
  @JoinColumn()
  wallet: Wallet;

  @Column({
    type: 'enum',
    enum: TransactionType,
    default: TransactionType.CREDIT,
    name: 'type',
  })
  type: TransactionType;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 4,
    name: 'amount',
    transformer: new ColumnNumericTransformer(),
  })
  amount: number;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 4,
    name: 'balance',
    transformer: new ColumnNumericTransformer(),
  })
  balance: number;

  @Column('varchar', { name: 'description', nullable: true })
  description: string;

  @CreateDateColumn({ name: 'date' })
  date: Date;
}
