import { Module } from '@nestjs/common';
import { FlavorRepository } from './flavor.repository';
import { FlavorService } from './flavor.service';

@Module({
  controllers: [],
  providers: [FlavorService, FlavorRepository],
})
export class FlavorModule {}
