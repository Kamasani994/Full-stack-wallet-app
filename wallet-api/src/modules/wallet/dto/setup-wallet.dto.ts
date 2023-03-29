import {
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class SetupWalletDto {
  @IsNotEmpty({ message: 'balance cannot be empty' })
  @IsNumber({}, { message: 'balance should be a valid number' })
  @IsNumber(
    { maxDecimalPlaces: 4 },
    { message: 'balance can have upto 4 decimal values' },
  )
  @Min(0, { message: 'Balance cannnot be less than 0' })
  balance: number;

  @IsString()
  @IsNotEmpty({ message: 'name cannot be empty' })
  name: string;
}
