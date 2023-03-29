import { ColumnNumericTransformer } from 'src/classes/ColumnNumericTransformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('wallet', { schema: 'wallet' })
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'name' })
  name: string;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 4,
    name: 'balance',
    transformer: new ColumnNumericTransformer(),
  })
  balance: number;

  @CreateDateColumn({ name: 'date' })
  date: Date;
}
