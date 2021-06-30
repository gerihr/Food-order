
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    canActivate(context: ExecutionContext){
        if(process.env["NODE_ENV"] == "development"){
            return true;
        }else{
            return super.canActivate(context);
        }
    }
}
