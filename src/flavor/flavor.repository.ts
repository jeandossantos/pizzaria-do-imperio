import { Injectable } from '@nestjs/common';
import { CreateFlavorType, UpdateFlavorType } from './flavor.types';

export interface IFlavorRepository {
  create: (data: CreateFlavorType) => Promise<any>;
  update: (id: string, data: UpdateFlavorType) => Promise<any>;
  findByName: (name: string) => Promise<any>;
  findByID: (id: string) => Promise<any>;
  delete: (id: string) => Promise<any>;
  findAll: () => Promise<any[]>;
}

@Injectable()
export class FlavorRepository implements IFlavorRepository {
  findAll: () => Promise<any[]>;
  findByID: (id: string) => Promise<any>;
  create: (data: CreateFlavorType) => Promise<any>;
  update: (id: string, data: UpdateFlavorType) => Promise<any>;
  findByName: (name: string) => Promise<any>;
  delete: (id: string) => Promise<any>;
}
