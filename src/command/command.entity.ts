import {} from '@nestjs/typeorm'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserCommandEntity } from "../user-command/user-command.entity";

@Entity('command')
export class CommandEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:true})
    shortcut:string;

    @Column({nullable:true})
    location:string;

    @Column({nullable:true})
    keymap:string;

    @Column()
    command:string;

    @Column({nullable:true})
    description:string;

    @Column()
    name:string; 
    
    @Column({default: "1"})    
    usable: boolean

    @OneToMany(type => UserCommandEntity, userCommand => userCommand.command)
    userCommand : UserCommandEntity[];

    
}

