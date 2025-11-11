import { IsString, IsInt, Min, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  productCode?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  minStock?: number;
}

