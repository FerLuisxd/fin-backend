import { HttpException, Injectable } from '@nestjs/common';
import { AuthHelper } from './auth.helper';
// import { db } from '../db/sqlLite3';
import { UserService } from '../user/user.service';

let key = process.env.KEY||'dsaadsadsadsafsads2adsa';
 //update
// Create an encryptor:
let encryptor = require('simple-encryptor')(key);
@Injectable()
export class LoginService {

  constructor(
    private userService:UserService,private authHelper: AuthHelper
  ) { }

  /*******************************************************
   * Basic Login with credentials
   *******************************************************/
  public async login(email, encryptedPass) {

    if (!email) {
      return (new HttpException("Email is required", 422))
    }
    if (!encryptedPass) {
      return (new HttpException("Password is required", 422))
    }
    return new Promise(async (resolve, reject) => {
      let row = await this.userService.getUserLogin(email);
      // console.log(row)
      if(row){
      if(row[0].password != encryptedPass){
        return reject(new HttpException("Incorrect password", 401))
      }
      else{
        return resolve(this.authHelper.genToken(row[0]))
      }
    }
   
    });
  }

}