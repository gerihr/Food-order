import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthExceptionFilter } from './auth/auth-exceptions.filters';
import { AuthModule } from './auth/auth.module';
import { configService } from './config/config.service';
import { UserModule } from './user/user.module';
import { OrderController } from './order/order.controller';
import { OrderModule } from './order/order.module';
import { MealController } from './meal/meal.controller';
import { MealModule } from './meal/meal.module';
import { OrderItemController } from './order-item/order-item.controller';
import { OrderItemModule } from './order-item/order-item.module';
import { CommentService } from './comment/comment.service';
import { CommentModule } from './comment/comment.module';
import { CommentController } from './comment/comment.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UserModule,
    AuthModule,
    UserModule,
    OrderModule,
    MealModule,
    OrderItemModule,
    CommentModule
  ],
  controllers: [AppController, OrderController, MealController, OrderItemController, CommentController],
  providers: [AppService,
  {
    provide: APP_FILTER,
    useClass: AuthExceptionFilter
  }],
})
export class AppModule {
  constructor( private readonly connection: Connection ){ }
}