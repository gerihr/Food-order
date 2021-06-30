import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from '../crud/crud.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService extends CRUDService<User>{
    constructor(
        @InjectRepository(User)
        public readonly repo: Repository<User>
    ){
        super(repo);
    }

    public async getUser(username: string, password: string){
        return await this.repo.find({ email: username, password });
    }
}
