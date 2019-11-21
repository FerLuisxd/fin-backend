import { Entity, Column, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, JoinTable, OneToOne, OneToMany, JoinColumn} from "typeorm";
import { BuyerEntity } from "../buyer/buyer.entity";
import { LetterEntity } from "../letter/letter.entity";
import { CostsEntity } from "../costs/costs.entity";
import { type } from "os";

@Entity('endorsment')
export class EndorsmentEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'decimal',precision:10,scale:7})
    tea:number

    @Column('datetime')
    paidDate:Date

    @Column({type:'decimal',precision:10,scale:2})
    discountedAmount:number

    
    @Column({type:'decimal',precision:10,scale:2})
    recievedAmount:number

    @Column({type:'decimal',precision:10,scale:7})
    tcea:number



    @ManyToOne(type=>BuyerEntity, buyer => buyer.endorsment,{onDelete: 'CASCADE'})
    buyer:BuyerEntity;

    @OneToOne(type=> LetterEntity,letter => letter.endorsment) 
    @JoinColumn()
    letter:LetterEntity

    
    @OneToMany(type => CostsEntity , costs => costs.endorsment,{ eager:true,cascade: ['insert', 'update'] })
    costs : CostsEntity[];
}

