import { Injectable , CanActivate, ExecutionContext } from "@nestjs/common";
import { Response } from "express";

@Injectable()
export class AuthenticatedGuard implements CanActivate{
    async canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest();
        const isAuthenticated = request.isAuthenticated();
        return isAuthenticated;
    }
}