import { OmitType, PickType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends OmitType(CreateCustomerDto, [
  'phone',
] as const) {}
