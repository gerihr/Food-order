import { Injectable, Type } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

export interface CRUDEntity {
    id: number;
}

@Injectable()
export class CRUDService<T>{
    constructor(
        readonly repo: Repository<T>
    ) { }

    public async getAll() {
        return await this.repo.find();
    }

    public async get(id: number) : Promise<T>{
        return await this.repo.findOne({ where: { id } });
    }

    public async add(entity: T) : Promise<T>{
        return await this.repo.save(entity);
    }

    public async update(id: number, entity: T & CRUDEntity) : Promise<T>{
        await this.repo.update(id, entity);
        return entity;
    }

    public async remove(id: number) : Promise<DeleteResult> {
        return await this.repo.delete(id);
    }
}