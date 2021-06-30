import { Injectable } from '@nestjs/common';
import { CRUDService } from '../crud/crud.service';
import { Repository } from 'typeorm';
import { MealEntity } from './meal.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MealService extends CRUDService<MealEntity>{
    constructor(
        @InjectRepository(MealEntity)
        readonly repo: Repository<MealEntity>
    ){
        super(repo);
    }

}
