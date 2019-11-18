import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { EndorsmentService } from './endorsment.service';
import { EndorsmentController } from './endorsment.controller';
import { EndorsmentEntity } from './endorsment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '../middlewares/auth.middleware';

import { UserEntity} from "../user/user.entity";
import { UserController} from "../user/user.controller";
import {  UserService} from "../user/user.service";


@Module({
  imports: [TypeOrmModule.forFeature([EndorsmentEntity, UserEntity])],
  providers: [EndorsmentService, UserService],
  controllers: [EndorsmentController, UserController],
  exports: [EndorsmentService, UserService, EndorsmentModule],
})
export class EndorsmentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(EndorsmentController);
  }
}

