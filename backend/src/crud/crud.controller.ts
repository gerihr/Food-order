
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CRUDEntity, CRUDService } from "./crud.service";

// @UseGuards(JwtAuthGuard)
@Controller()
export class CRUDController<T> {
    constructor(
        public service: CRUDService<T>
    ){}

    @Get()
    public async getAll(){
        return await this.service.getAll();
    }
    
    // @UseGuards(JwtAuthGuard)
    @Get(":id")
    public async get(@Param("id") id: number){
        return await this.service.get(id);
    }

    // @UseGuards(JwtAuthGuard)
    @Post()
    public async add(@Body() body: T){
        return await this.service.add(body);
    }

    @Put(":id")
    public async update(@Param("id") id: number, @Body() body: T & CRUDEntity){
        return await this.service.update(id, body);
    }

    @Delete(":id")
    public async remove(@Param("id") id: number){
        return await this.service.remove(id);
    }
}