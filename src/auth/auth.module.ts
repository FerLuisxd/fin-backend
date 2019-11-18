import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignUpService } from './signup.service';
import { LoginService } from './login.service';
import { AuthHelper } from './auth.helper';
import { UserModule } from '../user/user.module';
import { LetterModule } from '../letter/letter.module';
import { EndorsmentModule } from '../endorsement/endorsment.module';
import { CostsModule } from '../costs/costs.module';
import { BuyerModule } from '../buyer/buyer.module';
import { ClientModule } from '../client/client.module';


@Module({
  controllers: [ AuthController ],
  providers:[LoginService,SignUpService,AuthHelper],
  imports: [UserModule,LetterModule,EndorsmentModule,CostsModule,BuyerModule,ClientModule]
})

export class AuthModule {}
