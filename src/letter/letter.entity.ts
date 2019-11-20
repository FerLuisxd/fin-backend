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

    @ManyToOne(type=>UserEntity, user => user.letter,{onDelete: 'CASCADE'})
    user:UserEntity;

    @ManyToOne(type=>UserEntity, client => client.letter,{onDelete: 'CASCADE'})
    client:ClientEntity;

    @Column('datetime')
    startDate: Date

    @Column({type: 'datetime'})
    endDate: Date

    @Column({type: 'decimal'})
    nominalValue: number

    @Column()
    moneyType:string

    @OneToOne(type=> EndorsmentEntity,endorsment => endorsment.letter,{nullable:true}) 
    @JoinColumn()
    endorsment:EndorsmentEntity
 
}

