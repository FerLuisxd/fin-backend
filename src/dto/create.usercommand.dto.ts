import { UserEntity } from "../user/user.entity";
import { CommandEntity } from "../command/command.entity";

export class usercommandDTO{  
    
    userId:number;

    commandId:number;

    registerDate: Date;

    deletedDate: Date;  
}