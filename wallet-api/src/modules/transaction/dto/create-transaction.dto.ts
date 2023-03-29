import {
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsNotIn,
  isNotIn,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNotIn([0], { message: 'Amount cannot be 0' })
  amount: number;

  @IsOptional()
  @IsString()
  description: string;
}
