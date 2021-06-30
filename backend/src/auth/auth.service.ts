import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
        private readonly jwtService: JwtService
    ){}

    async validateUser(username: string , password: string): Promise<any>{
        const user:User[] = await this.usersService.getUser(username , password); 
        console.log("Validating user: " , user);
        if(user.length <= 0){
            return null
        }
        return user[0];
    }

    async login(user: User){
        const payload = {
            username: user.email,
            sub: user.id
        }
        const access_token = this.jwtService.sign(payload); 
        return access_token
    }
}
