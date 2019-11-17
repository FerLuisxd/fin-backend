import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandEntity } from './command.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommandService {

    constructor(
        @InjectRepository(CommandEntity)
        private commandRepository: Repository<CommandEntity>)
    {}
    
    public async getAllCommands()
    {
        return await this.commandRepository.find();
    }

    public async getCommandById(id: number)
    {
        let res = await this.commandRepository.findOne({id: id});
        // console.log(res);
        if (res == null){
            throw 'Command doesnt exist';
        }

        return res;
    }

    public async createCommand(NewCommand : CommandEntity)
    {
        let res;
        let err;
        let uc;
        let commands = await this.commandRepository.find({command : NewCommand.command});
        let names = await this.commandRepository.find({name : NewCommand.name});
        try {
            if (commands.length > 0) {
                throw 'Command already on use';
              }
              if (names.length > 0) {
                throw 'Name already on use';
              }
            res = await this.commandRepository.insert(NewCommand);            

            // console.log(res);

        } catch (error) {
            console.log(error);
            err = error;            
        }

        return (
            err || {
                message: 'Created',
                created: true,
                id: res.identifiers[0].id,
            }
        );
    }

    public async editCommand(EditedCommand: CommandEntity, id)
    {
        let res;
        let err;
        let commands = await this.commandRepository.findOne({id : id});
        try {
            if (commands != null) 
            {            
                console.log(EditedCommand);
                res = await this.commandRepository.update(commands,EditedCommand);
                // console.log(res);                
            }            

            else{
                throw 'Command doesnt exist';
            }
            
        } catch (e) {
            err = e;
            console.log(err);
            throw err;
        }

        return (
            err || {
                message: 'Updated',
                Updated: true,
                id: res.id,
            }
        );
    }

    public async deleteCommand(id)
    {
        let res;
        let err;
        let command = await this.commandRepository.findOne({id:id});

        try {
            if (command != null) {
                //command.usable = false;
                res = await this.commandRepository.update(command,{usable:false});
                console.log(res);                
            } else {
                throw "Command doesnt exist";
                
            }
        } catch (error) {
            err = error;
            console.log(err);
            throw err;            
        }

        return (
            err || {
                message: "Usable False",
                usable: false,
                id: id,
            }
        );
    }

    public async usableON(id)
    {
        let res;
        let err;
        let command = await this.commandRepository.findOne({id:id});

        try {
            if (command != null) {
                //command.usable = false;
                res = await this.commandRepository.update(command,{usable:true});
                console.log(res);                
            } else {
                throw "Command doesnt exist";
                
            }
        } catch (error) {
            err = error;
            console.log(err);
            throw err;            
        }

        return (
            err || {
                message: "Usable True",
                usable: true,
                id: id,
            }
        );
    }
}