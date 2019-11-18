import {} from '@nestjs/typeorm'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
// import { ClientCommandEntity} from "../client-command/client-command.entity";
import { LetterEntity } from '../letter/letter.entity';

@Entity('client')
export class ClientEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    ruc:string;

    @Column()
    socialNumber:string;

    @Column()
    comercialName:string;
    
    @Column()
    address:string;

    @OneToMany(type => LetterEntity , LetterEntity => LetterEntity.client)
    letter : LetterEntity[];
}

