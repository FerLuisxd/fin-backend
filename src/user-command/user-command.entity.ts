import { Entity, Column, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, JoinTable} from "typeorm";
import { UserEntity } from "../user/user.entity";
import { CommandEntity } from "../command/command.entity";

@Entity('usercommand')
export class UserCommandEntity {//a
    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(type=>UserEntity, user => user.userCommand,{onDelete: 'CASCADE'})
  //  @JoinTable()
    user:UserEntity;

    @ManyToOne(type => CommandEntity, command => command.userCommand, {onDelete: 'CASCADE'})
   // @JoinTable()
    command:CommandEntity;    

    @Column('datetime')
    registerDate: Date

    @Column({nullable: true, type: 'datetime'})
    deletedDate: Date

}

