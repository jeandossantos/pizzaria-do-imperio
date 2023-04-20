import { jest, expect, describe, test, beforeEach } from '@jest/globals';

import { CustomerService } from './customer.service';
import { BadRequestException } from '@nestjs/common';

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(async () => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  const customerMock = {
    name: 'John Doe',
    phone: '1234567890',
    neighborhood: 'Central Park',
    street: 'Fifth Avenue',
    number: 1234,
    complement: 'Apt 42',
  };

  const repositoryMock = {
    create: function fnMock(): any {},
    update: function fnMock(): any {},
    delete: function fnMock(): any {},
    findByPhone: function fnMock(): any {},
  };

  describe('#create', () => {
    test('should not pass if customer already exists', async () => {
      jest.spyOn(repositoryMock, 'findByPhone').mockResolvedValue(true);
      jest.spyOn(repositoryMock, 'create').mockResolvedValue('');

      const service = new CustomerService(repositoryMock);

      const result = service.create(customerMock);
      const expectedError = new BadRequestException(
        'Customer already exists',
        'CUSTOMER_ALREADY_EXISTS',
      );

      expect(repositoryMock.findByPhone).toHaveBeenCalled();
      expect(repositoryMock.create).not.toHaveBeenCalled();

      await expect(result).rejects.toThrowError(expectedError);
    });

    test('should pass successfully', async () => {
      jest.spyOn(repositoryMock, 'findByPhone').mockResolvedValue(false);
      jest.spyOn(repositoryMock, 'create').mockResolvedValue('');

      const service = new CustomerService(repositoryMock);

      const result = await service.create(customerMock);

      expect(repositoryMock.findByPhone).toHaveBeenCalled();
      expect(repositoryMock.create).toHaveBeenCalled();
    });
  });

  describe('#update', () => {
    test('should pass successfully', async () => {
      jest.spyOn(repositoryMock, 'update').mockResolvedValue('');

      const service = new CustomerService(repositoryMock);

      const result = await service.update('uuid', customerMock);

      expect(repositoryMock.update).toHaveBeenCalled();
    });
  });

  describe('#delete', () => {
    test('should pass successfully', async () => {
      jest.spyOn(repositoryMock, 'delete').mockResolvedValue('');

      const service = new CustomerService(repositoryMock);

      const result = await service.delete('uuid');

      expect(repositoryMock.delete).toHaveBeenCalled();
    });
  });

  describe('#findByPhone', () => {
    test('should return falsy if customer not exists', async () => {
      jest.spyOn(repositoryMock, 'findByPhone').mockResolvedValue(undefined);

      const service = new CustomerService(repositoryMock);

      const result = await service.findByPhone('phone');

      expect(repositoryMock.findByPhone).toHaveBeenCalled();
      expect(result).toBeFalsy();
    });

    test('should pass successfully', async () => {
      jest.spyOn(repositoryMock, 'findByPhone').mockResolvedValue(customerMock);

      const service = new CustomerService(repositoryMock);

      const result = await service.findByPhone('phone');

      expect(repositoryMock.findByPhone).toHaveBeenCalled();
      expect(result).toBeTruthy();
    });
  });
});
