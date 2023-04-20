import { Injectable } from '@nestjs/common';
import { CreateFlavorType, UpdateFlavorType } from './flavor.types';

export interface IFlavorRepository {
  create: (data: CreateFlavorType) => Promise<any>;
  update: (id: string, data: UpdateFlavorType) => Promise<any>;
  findByPhone: (phone: string) => Promise<any>;
  delete: (id: string) => Promise<any>;
}

@Injectable()
export class FlavorRepository implements IFlavorRepository {
  create: (data: CreateFlavorType) => Promise<any>;
  update: (id: string, data: UpdateFlavorType) => Promise<any>;
  findByPhone: (phone: string) => Promise<any>;
  delete: (id: string) => Promise<any>;
}
