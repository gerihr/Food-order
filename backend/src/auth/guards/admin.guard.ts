import { Injectable , CanActivate, ExecutionContext, Inject, forwardRef } from "@nestjs/common";
import { UserType } from "../../user/user.types";
import { UserService } from "../../user/user.service";

@Injectable()
export class AdminGuard implements CanActivate{
    constructor(
        @Inject(forwardRef(()=> UserService))
        private readonly userService: UserService,
    ){}
    async canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest();
        const user = await this.userService.get(request.user.id);

        console.log("User is: ", user);
        return user.type == UserType.Admin;
    }
}