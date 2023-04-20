import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { FlavorModule } from './flavor/flavor.module';

@Module({
  imports: [CustomerModule, FlavorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
