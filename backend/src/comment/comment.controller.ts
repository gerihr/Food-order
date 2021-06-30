import { Controller } from '@nestjs/common';
import { CRUDController } from '../crud/crud.controller';
import { CommentEntity } from './comment.entity';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController extends CRUDController<CommentEntity>{
    constructor(
        readonly service: CommentService
    ){
        super(service);
    }
}
