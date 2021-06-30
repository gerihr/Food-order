import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CRUDService } from '../crud/crud.service';
import { OrderItemEntity } from './order-item.entity';

@Injectable()
export class OrderItemService extends CRUDService<OrderItemEntity>{
    constructor(
        @InjectRepository(OrderItemEntity)
        readonly repo: Repository<OrderItemEntity>
    ){
        super(repo);
    }


    public async getAll() {
        return await this.repo.find({ relations: ["meal"] });
    }

    public async get(id: number){
        return await this.repo.findOne({ where: { id }, relations: ["meal"] });
    }

}
