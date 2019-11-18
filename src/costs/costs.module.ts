import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { CostsService } from './costs.service';
import { CostsController } from './costs.controller';
import { CostsEntity } from './costs.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '../middlewares/auth.middleware';

import { UserEntity} from "../user/user.entity";
import { UserController} from "../user/user.controller";
import {  UserService} from "../user/user.service";


@Module({
  imports: [TypeOrmModule.forFeature([CostsEntity, UserEntity])],
  providers: [CostsService, UserService],
  controllers: [CostsController, UserController],
    exports: [CostsService, UserService, CostsModule],
  })
export class CostsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(CostsController);
  }
}

