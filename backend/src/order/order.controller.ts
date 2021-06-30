import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CRUDController } from '../crud/crud.controller';
import { OrderEntity } from './order.entity';
import { OrderService } from './order.service';

@Controller('order')
@UseGuards(JwtAuthGuard)
export class OrderController extends CRUDController<OrderEntity>{
    constructor(
        readonly service: OrderService
    ){
        super(service);
    }
}
