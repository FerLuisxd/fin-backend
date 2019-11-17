import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { UserCommandService } from './user-command.service';
import { UserCommandController } from './user-command.controller';
import { UserCommandEntity } from './user-command.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from './../middlewares/auth.middleware';

import { UserEntity} from "../user/user.entity";
import { UserController} from "../user/user.controller";
import {  UserService} from "../user/user.service";

import { CommandEntity} from "../command/command.entity";
import { CommandController } from "../command/command.controller";
import {  CommandService} from "../command/command.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserCommandEntity, UserEntity, CommandEntity])],
  providers: [UserCommandService, UserService, CommandService],
  controllers: [UserCommandController, UserController, CommandController],
  exports: [UserCommandService, UserService, CommandService, UserCommandModule],
})
export class UserCommandModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UserCommandController);
  }
}

