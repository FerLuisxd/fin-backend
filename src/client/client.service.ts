import { Injectable, HttpException } from '@nestjs/common';
import * as uuid from 'uuid';
// import { db } from '../db/sqlLite3';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from './client.entity'
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
  ) {
    console.log('Redy');
    // console.log(this.clientRepository.find());
  }
  /*******************************************************
   * Get all Clients
   *******************************************************/
  public getAllClients() {
    return this.clientRepository.find();
  }

  /*******************************************************
   * Get One Client by Id
   *******************************************************/
  public async getClient(value: any) {
    console.log("looking",value)

    let res = await this.clientRepository.find({
      where: { clientname: value }
    });
    return res;
  }
  public async getClientLogin(value: any) {
    console.log("looking",value)
    let res = await this.clientRepository.find({
      where: { email: value },
    });
    return res;
  }




  /*******************************************************
   * Create Client
   *******************************************************/

  public async createClient(ruc: string, rs: string, nom: string,add:string) {
    let res;
    let err;
    let clients = await this.clientRepository.find({ ruc: ruc });
    let emails = await this.clientRepository.find({ socialNumber: rs });
    try { 
      if (clients.length > 0) {
        throw 'Clientname already on use';
      }
      if (emails.length > 0) {
        throw 'Email already on use';
      }
      let client = new ClientEntity();
      client.ruc = ruc;
      client.socialNumber = rs;
      client.comercialName = nom;
      client.address = add;
      res = await this.clientRepository.insert(client);
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
   * Update Client
   *******************************************************/

  public updateClient(
    id: String,
    clientname: String,
    email: String,
    password: String,
    role: String,
  ) {

  }

  /*******************************************************
   * Delete Client
   *******************************************************/

  public deleteClient(id: String) {
    //WILL FAIL, NOT IMPLEMENTED.
    // return new Promise((resolve, reject) => {
    //   db.run('DELETE From client WHERE id = ?', [id], err => {
    //     return !err
    //       ? resolve({ message: 'Client ' + id + ' has been deleted' })
    //       : reject(new HttpException(err, 500));
    //   });
    // });
  }
}
