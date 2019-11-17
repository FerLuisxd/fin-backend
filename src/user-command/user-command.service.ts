import { Injectable, HttpException, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCommandEntity } from './user-command.entity'
import {  UserEntity } from "../user/user.entity";
import {  CommandEntity } from "../command/command.entity";
import { Repository } from 'typeorm';



@Injectable()
export class UserCommandService {

    constructor(
        @InjectRepository(UserCommandEntity)
        private userCommandRepository: Repository<UserCommandEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(CommandEntity)
        private commandRepository: Repository<CommandEntity>,
    ){}

    public async getAllUserCommmand()
    {        
        return await this.userCommandRepository.find({ relations: ["user", "command"] });
    }

    public async getCommandByUser(userID: any)
    {
        let res = await this.userCommandRepository.find({where: {user:userID}, relations: ["user", "command"]})
        // if (res.length <1){ throw 'This user doesnt have commands.';}
        console.log(res.length);
        return res;
    }

    public async editUserCommand(EditedUserCommand: UserCommandEntity, id)
    {
        let res;
        let err;
        let userCommands = await this.userCommandRepository.findOne({id: id});
        try {
            if (userCommands == null) { throw 'this userCommand doesnt exist';}
            res = await this.userCommandRepository.update(userCommands,EditedUserCommand);
        } catch (error) {
            err = error;
            console.log(err);
            throw err;
        }

        return (
            err || {
                message: 'Updated',
                Updated: true,
                id: res.id,
            }

        )

    }

    public async deleteCommand(id)
    {
        let res;
        let err;
        let command = await this.userCommandRepository.findOne({id:id});

        try {
            if (command != null) {
                res = await this.userCommandRepository.delete({id:id});
                console.log(res);                
            } else {
                throw "userCommand doesnt exist";
                
            }
        } catch (error) {
            err = error;
            console.log(err);
            throw err;            
        }

        return (
            err || {
                message: "Eliminated",
                Eliminated: true,
                id: id,
            }
        );
    }

    public async createUserCommand(userid: number, command: CommandEntity)
    {
        let res;
        let err;
        let today = new Date();
        let NewUserCommand = new UserCommandEntity();
      
        try {            
            let user = await this.userRepository.findOne({id:userid});
            NewUserCommand.command = command;
            NewUserCommand.user = user;
            NewUserCommand.registerDate = today;
            res = await this.userCommandRepository.insert(NewUserCommand);

        } catch (error) {
            console.log(error);
            err = error;                 
        }

        return (
            err || {
                message: 'Created',
                created: true,
                id: NewUserCommand.id,
                userid: NewUserCommand.user.id,
                commandid: NewUserCommand.command.id,
            }
        );
    }
}
