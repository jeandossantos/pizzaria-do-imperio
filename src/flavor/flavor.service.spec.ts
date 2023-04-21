import { jest, expect, describe, test, beforeEach } from '@jest/globals';

import { BadRequestException } from '@nestjs/common';
import { FlavorService } from './flavor.service';
import { randomUUID } from 'crypto';

describe('FlavorService', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  const FLAVOR_ID = randomUUID();

  const flavorMock = {
    name: 'Mussarela',
    priceSmall: 20,
    priceMedium: 30,
    priceLarge: 40,
    priceBordered: 50,
  };

  const repositoryMock = {
    create: function fnMock(): any {},
    update: function fnMock(): any {},
    delete: function fnMock(): any {},
    findByName: function fnMock(): any {},
    findByID: function fnMock(): any {},
    findAll: function fnMock(): any {},
  };

  describe('#create', () => {
    test('should fail if flavor already exists', async () => {
      jest.spyOn(repositoryMock, 'findByName').mockResolvedValue(true);
      jest.spyOn(repositoryMock, 'create').mockResolvedValue('');

      const service = new FlavorService(repositoryMock);

      const result = service.create(flavorMock);
      const expectedError = new BadRequestException(
        'Flavor already exists',
        'FLAVOR_ALREADY_EXISTS',
      );

      expect(repositoryMock.findByName).toHaveBeenCalled();
      expect(repositoryMock.create).not.toHaveBeenCalled();

      await expect(result).rejects.toThrowError(expectedError);
    });

    test('should create flavor', async () => {
      jest.spyOn(repositoryMock, 'findByName').mockResolvedValue(false);
      jest.spyOn(repositoryMock, 'create').mockResolvedValue('');

      const service = new FlavorService(repositoryMock);

      await service.create(flavorMock);

      expect(repositoryMock.findByName).toHaveBeenCalled();
      expect(repositoryMock.create).toHaveBeenCalled();
    });
  });

  describe('#update', () => {
    test('should not update if flavor already exists and id is unlike this one', async () => {
      jest
        .spyOn(repositoryMock, 'findByName')
        .mockResolvedValue({ id: 'some-id' });
      jest.spyOn(repositoryMock, 'update').mockResolvedValue('');

      const data = { ...flavorMock };

      const service = new FlavorService(repositoryMock);

      const result = service.update(FLAVOR_ID, data);

      const expectedError = new BadRequestException(
        'Flavor already exists',
        'FLAVOR_ALREADY_EXISTS',
      );

      expect(repositoryMock.findByName).toHaveBeenCalled();
      expect(repositoryMock.update).not.toHaveBeenCalled();

      await expect(result).rejects.toThrowError(expectedError);
    });

    test('should update a flavor', async () => {
      jest
        .spyOn(repositoryMock, 'findByName')
        .mockResolvedValue({ id: FLAVOR_ID });
      jest.spyOn(repositoryMock, 'update').mockResolvedValue('');

      const service = new FlavorService(repositoryMock);

      await service.update(FLAVOR_ID, flavorMock);

      expect(repositoryMock.findByName).toHaveBeenCalled();
      expect(repositoryMock.update).toHaveBeenCalled();
    });
  });

  describe('#delete', () => {
    test('should not delete a flavor if it not exists', async () => {
      jest.spyOn(repositoryMock, 'findByID').mockResolvedValue(true);
      jest.spyOn(repositoryMock, 'delete').mockResolvedValue('');

      const service = new FlavorService(repositoryMock);

      const result = service.delete(FLAVOR_ID);
      const expectedError = new BadRequestException(
        'Not Found',
        'FLAVOR_NOT_FOUND',
      );

      expect(repositoryMock.findByID).toHaveBeenCalled();
      expect(repositoryMock.delete).not.toHaveBeenCalled();

      await expect(result).rejects.toThrowError(expectedError);
    });

    test('should delete a flavor if it exists', async () => {
      jest.spyOn(repositoryMock, 'findByID').mockResolvedValue(null);
      jest.spyOn(repositoryMock, 'delete').mockResolvedValue('');

      const service = new FlavorService(repositoryMock);

      await service.delete(FLAVOR_ID);

      expect(repositoryMock.findByID).toHaveBeenCalled();
      expect(repositoryMock.delete).toHaveBeenCalled();
    });
  });

  describe('#findAl', () => {
    test('should find all flavors', async () => {
      jest.spyOn(repositoryMock, 'findAll').mockResolvedValue([
        {
          id: FLAVOR_ID,
          ...flavorMock,
        },
      ]);

      const service = new FlavorService(repositoryMock);
      const result = await service.findAll();

      expect(repositoryMock.findAll).toHaveBeenCalled();
      expect(result).toBeInstanceOf(Array);
    });
  });
});
