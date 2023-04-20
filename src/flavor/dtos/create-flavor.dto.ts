import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateFlavorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  @Max(2)
  size: number;

  @IsNotEmpty()
  @IsBoolean()
  border: boolean;

  @IsNotEmpty()
  @IsNumber()
  priceSmall: number;
  @IsNotEmpty()
  @IsNumber()
  priceMedium: number;

  @IsNotEmpty()
  @IsNumber()
  priceLarge: number;

  @IsNotEmpty()
  @IsNumber()
  priceBordered: number;
}
