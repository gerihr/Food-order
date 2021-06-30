import { Controller, Get, Post, UseGuards, Request, Body, Res, HttpCode, HttpException, HttpStatus, Req } from '@nestjs/common';
import { request } from 'express';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { LoginGuard } from './auth/guards/login.guard';
import { User } from './user/user.entity';
import { UserService } from './user/user.service';
import { UserType } from './user/user.types';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly userService: UserService) {}


  @Post("/register")
  public async register(@Request() req){
    //Register by default standard user
    const user = await this.userService.add({...req.body, type: UserType.User});
    const jwtToken = await this.authService.login(user);
    //Remove password from DTO
    const { password, ...result } = user;
    return {
      token: jwtToken,
      user: result,
      expiration: 3600
    }
  }

  @UseGuards(LoginGuard)
  @Post("/login")
  public async login(@Request() req){
    const jwtToken = await this.authService.login(req.user);
    //Remove password from DTO
    const { password, ...result } = req.user;
    return {
      token: jwtToken,
      user: result,
      expiration: 3600
    }
  }


  @Get("/logout")
  public async logout(@Request() request){
    if(!request.user)
      return;
    const { password, ...user } = request.user;
    console.log("User", user);
    request.logout();
    return user;
  }

}