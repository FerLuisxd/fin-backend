import { Injectable, HttpException } from '@nestjs/common';
import * as uuid from 'uuid';
// import { db } from '../db/sqlLite3';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    console.log('Redy');
    console.log(this.userRepository.find());
  }
  /*******************************************************
   * Get all Users
   *******************************************************/
  public getAllUsers() {
    return this.userRepository.find();
  }

  /*******************************************************
   * Get One User by Id
   *******************************************************/
  public async getUser(value: any) {
    console.log("looking",value)

    let res = await this.userRepository.find({
      select: ['id', 'email'],
      where: { username: value },
    });
    return res;
  }
  public async getUserLogin(value: any) {
    console.log("looking",value)
    let res = await this.userRepository.find({
      where: { email: value },
    });
    return res;
  }




  /*******************************************************
   * Create User
   *******************************************************/

  public async createUser(value:UserEntity) {
    let res;
    let err;
    let emails = await this.userRepository.find({ email: value.email });
    try { 
      if (emails.length > 0) {
        throw 'Email already on use';
      }
      res = await this.userRepository.insert(value);
      // console.log(res);
    } catch (e) {
      console.log(e);
      err = e;
    }
    console.log('Err', err);
    return (
      err || {
        message: 'Registered',
        registered: true,
        id: res.identifiers[0].id,
        role: 'normal',
      }
    );
  }

  /*******************************************************
   * Update User
   *******************************************************/

  public updateUser(
    id: String,
    username: String,
    email: String,
    password: String,
    role: String,
  ) {

  }

  /*******************************************************
   * Delete User
   *******************************************************/

  public deleteUser(id: String) {
    //WILL FAIL, NOT IMPLEMENTED.
    // return new Promise((resolve, reject) => {
    //   db.run('DELETE From user WHERE id = ?', [id], err => {
    //     return !err
    //       ? resolve({ message: 'User ' + id + ' has been deleted' })
    //       : reject(new HttpException(err, 500));
    //   });
    // });
  }
}
