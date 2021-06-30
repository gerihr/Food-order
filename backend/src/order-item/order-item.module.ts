import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemController } from './order-item.controller';
import { OrderItemEntity } from './order-item.entity';
import { OrderItemService } from './order-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItemEntity])],
  providers: [OrderItemService],
  controllers: [OrderItemController],
  exports: [OrderItemService]
})
export class OrderItemModule {}
