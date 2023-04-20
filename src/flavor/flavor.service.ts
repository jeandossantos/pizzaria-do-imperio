import { Injectable } from '@nestjs/common';
import { FlavorRepository } from './flavor.repository';
import { CreateFlavorType } from './flavor.types';

@Injectable()
export class FlavorService {
  constructor(private readonly flavorRepository: FlavorRepository) {}

  async create(flavorDto: CreateFlavorType) {
    await this.flavorRepository.create(flavorDto);
  }
}
