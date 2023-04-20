import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCustomerType, UpdateCustomerType } from './types/customer-types';
import { ICustomerRepository } from './customer.repository';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: ICustomerRepository) {}

  async create(customerDto: CreateCustomerType) {
    const customer = await this.customerRepository.findByPhone(
      customerDto.phone,
    );

    if (customer) {
      throw new BadRequestException(
        'Customer already exists',
        'CUSTOMER_ALREADY_EXISTS',
      );
    }

    await this.customerRepository.create(customerDto);
  }

  async findByPhone(phone: string) {
    return await this.customerRepository.findByPhone(phone);
  }

  async delete(id: string) {
    return await this.customerRepository.delete(id);
  }

  async update(id: string, customerDto: UpdateCustomerType) {
    await this.customerRepository.update(id, customerDto);
  }
}
