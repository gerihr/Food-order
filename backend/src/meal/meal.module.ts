import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { MealController } from './meal.controller';
import { MealEntity } from './meal.entity';
import { MealService } from './meal.service';

@Module({
  imports: [TypeOrmModule.forFeature([MealEntity, User])],
  providers: [MealService, UserService],
  controllers: [MealController],
  exports: [MealService]
})
export class MealModule {}
