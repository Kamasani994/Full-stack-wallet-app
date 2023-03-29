import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

export class PageOptionsDto {
  @IsNotEmpty()
  walletId: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  readonly skip?: number = 0;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly limit?: number = 25;
}
