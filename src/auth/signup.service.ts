import { HttpException, Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthHelper } from './auth.helper';
let key = process.env.KEY||'dsaadsadsadsafsads2adsa';
 
// Create an encryptor:
let encryptor = require('simple-encryptor')(key);
@Injectable()
export class SignUpService {
    constructor(private userService:UserService, private authHelper:AuthHelper){
    }

/*******************************************************
 * SignUp user account
 *******************************************************/
  public async signup(user){
    let res = await this.userService.createUser(user)
    if(res.registered){
      let id = res.id
      let role = res.role
      let email = user.email
      let password = user.password
      return this.authHelper.genToken(({email,password,id,role}))
    }
    else{
      throw new BadRequestException({error:"Incorrect signup data", reason:res})
    }
  }

}