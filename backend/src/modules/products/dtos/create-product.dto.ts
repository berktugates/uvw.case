import { IsString, IsInt, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  productCode: string;

  @IsString()
  name: string;

  @IsString()
  brand: string;

  @IsInt()
  @Min(0)
  minStock: number;
}

