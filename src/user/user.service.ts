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
    return this.userRepository.find({ select: ['id', 'role', 'username'] });
  }

  /*******************************************************
   * Get One User by Id
   *******************************************************/
  public async getUser(value: any) {
    console.log("looking",value)

    let res = await this.userRepository.find({
      select: ['id', 'role', 'username'],
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

  public async createUser(username: string, email: string, password: string) {
    let res;
    let err;
    let users = await this.userRepository.find({ username: username });
    let emails = await this.userRepository.find({ email: email });
    try { 
      if (users.length > 0) {
        throw 'Username already on use';
      }
      if (emails.length > 0) {
        throw 'Email already on use';
      }
      let user = new UserEntity();
      user.email = email;
      user.username = username;
      user.password = password;
      user.role = 'normal';
      res = await this.userRepository.insert(user);
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
