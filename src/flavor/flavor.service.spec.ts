import { jest, expect, describe, test, beforeEach } from '@jest/globals';

import { BadRequestException } from '@nestjs/common';
import { FlavorService } from './flavor.service';

describe('FlavorService', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  const flavorMock = {
    name: 'Mussarela',
    size: 2,
    border: true,
    price: 20,
  };

  const repositoryMock = {
    create: function fnMock(): any {},
    update: function fnMock(): any {},
    delete: function fnMock(): any {},
    findByPhone: function fnMock(): any {},
  };

  describe('#create', () => {
    test('should create name', async () => {
      jest.spyOn(repositoryMock, 'create').mockResolvedValue('');

      const service = new FlavorService(repositoryMock);

      await service.create(flavorMock);

      expect(repositoryMock.create).toHaveBeenCalled();
    });
  });
});
