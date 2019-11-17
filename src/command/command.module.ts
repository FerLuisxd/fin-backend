import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { CommandService } from './command.service';
import { CommandController } from './command.controller';
import { AuthMiddleware } from './../middlewares/auth.middleware';
import { CommandEntity } from './command.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCommandService } from "../user-command/user-command.service";
import {UserCommandEntity  } from "../user-command/user-command.entity";
import {UserCommandController } from "../user-command/user-command.controller";
import { UserCommandModule } from "../user-command/user-command.module";


@Module({
  imports: [TypeOrmModule.forFeature([CommandEntity]),UserCommandModule],
  providers: [CommandService],
  controllers: [CommandController],
  exports: [CommandService],
})
export class CommandModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(CommandController);
  }
}

 