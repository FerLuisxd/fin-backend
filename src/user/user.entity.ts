import {} from '@nestjs/typeorm'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { LetterEntity } from '../letter/letter.entity';

@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;

    @Column()
    password:string;
    

    @Column()
    question:string

    @Column()
    answer:string


    @OneToMany(type => LetterEntity , LetterEntity => LetterEntity.user)
    letter : LetterEntity[];
}

