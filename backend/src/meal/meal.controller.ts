import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../auth/guards/admin.guard';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CRUDController } from '../crud/crud.controller';
import { MealEntity } from './meal.entity';
import { MealService } from './meal.service';

@Controller('meal')
export class MealController extends CRUDController<MealEntity>{
    constructor(
        public readonly service: MealService
    ){
        super(service);
    }

    @Get()
    public async getAll(){
        return await this.service.getAll();
    }

    @UseGuards(JwtAuthGuard,AdminGuard)
    @Post()
    public async add(@Body() body: MealEntity){
        return await this.service.add(body);
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id")
    public async update(@Param("id") id: number, @Body() body: MealEntity){
        return await this.service.update(id, body);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    public async remove(@Param("id") id: number){
        return await this.service.remove(id);
    }
}
