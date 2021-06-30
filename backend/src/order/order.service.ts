import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CRUDService } from '../crud/crud.service';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrderService extends CRUDService<OrderEntity>{
    constructor(
        @InjectRepository(OrderEntity)
        readonly repo: Repository<OrderEntity>
    ){
        super(repo);
    }

    public async getAll() {
        return await this.repo.find({ relations: ["items", "items.meal"] });
    }
}
