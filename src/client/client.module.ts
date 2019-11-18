import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from'./client.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ClientEntity } from './client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity])],
  providers: [ClientService],
  controllers: [ClientController],
  exports: [ClientService],
})
export class ClientModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(ClientController);
  }
}
