import { OmitType } from '@nestjs/mapped-types';
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

export class UpdateFlavorDto extends OmitType(CreateFlavorDto, [] as const) {}
