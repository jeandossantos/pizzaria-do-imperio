import { BadRequestException, Injectable } from '@nestjs/common';
import { FlavorRepository } from './flavor.repository';
import { CreateFlavorType, UpdateFlavorType } from './flavor.types';

@Injectable()
export class FlavorService {
  constructor(private readonly flavorRepository: FlavorRepository) {}

  async create(flavorDto: CreateFlavorType) {
    const flavor = await this.flavorRepository.findByName(flavorDto.name);

    if (flavor) {
      throw new BadRequestException(
        'Flavor already exists',
        'FLAVOR_ALREADY_EXISTS',
      );
    }

    await this.flavorRepository.create(flavorDto);
  }

  async update(id: string, flavorDto: UpdateFlavorType) {
    const flavor = await this.flavorRepository.findByName(flavorDto.name);

    if (flavor && flavor.id !== id) {
      throw new BadRequestException(
        'Flavor already exists',
        'FLAVOR_ALREADY_EXISTS',
      );
    }

    await this.flavorRepository.update(id, flavorDto);
  }

  async delete(id: string) {
    const flavor = await this.flavorRepository.findByID(id);

    if (flavor) {
      throw new BadRequestException('Not Found', 'FLAVOR_NOT_FOUND');
    }

    await this.flavorRepository.delete(id);
  }

  async findAll() {
    return await this.flavorRepository.findAll();
  }
}
