import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { BuyerService } from './buyer.service';
import { BuyerController } from './buyer.controller'
import { BuyerEntity } from './buyer.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '../middlewares/auth.middleware';

import { UserEntity} from "../user/user.entity";
import { UserController} from "../user/user.controller";
import {  UserService} from "../user/user.service";


@Module({
  imports: [TypeOrmModule.forFeature([BuyerEntity, UserEntity])],
  providers: [BuyerService, UserService ],
  controllers: [BuyerController, UserController],
    exports: [BuyerService, UserService, BuyerModule],
  })
export class BuyerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(BuyerController);
  }
}

