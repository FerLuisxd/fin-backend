import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { LetterService } from './letter.service';
import { LetterController } from './letter.controller';
import { LetterEntity } from './letter.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '../middlewares/auth.middleware';

import { UserEntity} from "../user/user.entity";
import { UserController} from "../user/user.controller";
import {  UserService} from "../user/user.service";


@Module({
  imports: [TypeOrmModule.forFeature([LetterEntity, UserEntity])],
  providers: [LetterService, UserService],
  controllers: [LetterController, UserController],
    exports: [LetterService, UserService, LetterModule],
  })
export class LetterModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(LetterController);
  }
}

