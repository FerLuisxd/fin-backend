import { Entity, Column, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, JoinTable, OneToMany, OneToOne, JoinColumn} from "typeorm";
import { UserEntity } from "../user/user.entity";
import { EndorsmentEntity } from "../endorsement/endorsment.entity";
import { ClientEntity } from "../client/client.entity";

@Entity('letter')
export class LetterEntity {//a
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    correlative:string


    @ManyToOne(type=>ClientEntity   , client => client.letter,{eager:true,onDelete: 'CASCADE'})
    client:ClientEntity;


    @ManyToOne(type=>UserEntity, user => user.letter,{eager:true,onDelete: 'CASCADE'})
    user:UserEntity;

    @Column('datetime')
    startDate: Date

    @Column({type: 'datetime'})
    endDate: Date

    @Column({type:'decimal',precision:10,scale:2})
    nominalValue: number

    @Column()
    moneyType:string

    @OneToOne(type=> EndorsmentEntity,endorsment => endorsment.letter,{eager:true,nullable:true,onDelete:'CASCADE'}) 
    @JoinColumn()
    endorsment:EndorsmentEntity
 
}

