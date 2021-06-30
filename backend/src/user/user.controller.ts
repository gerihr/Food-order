import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CRUDController } from '../crud/crud.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController extends CRUDController<User> {
    constructor(
        public readonly service: UserService
    ){
        super(service);
    }
}
