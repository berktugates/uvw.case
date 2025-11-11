import { IsString, IsInt, Min } from 'class-validator';

export class StockInDto {
  @IsString()
  productCode: string;

  @IsInt()
  @Min(1)
  quantity: number;
}

