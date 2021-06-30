import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CRUDController } from '../crud/crud.controller';
import { OrderItemEntity } from './order-item.entity';
import { OrderItemService } from './order-item.service';

@Controller('order-item')
@UseGuards(JwtAuthGuard)
export class OrderItemController extends CRUDController<OrderItemEntity>{
    constructor(
        readonly service: OrderItemService
    ){
        super(service);
    }
}
