import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignUpService } from './signup.service';
import { LoginService } from './login.service';
import { AuthHelper } from './auth.helper';
import { UserModule } from '../user/user.module';
import { CommandModule } from "../command/command.module";
import { UserCommandModule } from '../user-command/user-command.module';

@Module({
  controllers: [ AuthController ],
  providers:[LoginService,SignUpService,AuthHelper],
  imports: [UserModule, CommandModule, UserCommandModule]
})

export class AuthModule {}
