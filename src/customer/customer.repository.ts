import { Injectable } from '@nestjs/common';
import { CreateCustomerType, UpdateCustomerType } from './types/customer-types';

export interface ICustomerRepository {
  create: (data: CreateCustomerType) => Promise<any>;
  update: (id: string, data: UpdateCustomerType) => Promise<any>;
  findByPhone: (phone: string) => Promise<any>;
  delete: (id: string) => Promise<any>;
}

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  create: (data: CreateCustomerType) => Promise<any>;
  update: (id: string, data: UpdateCustomerType) => Promise<any>;
  findByPhone: (phone: string) => Promise<any>;
  delete: (id: string) => Promise<any>;
}
