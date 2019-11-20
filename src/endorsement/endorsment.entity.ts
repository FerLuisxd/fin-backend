import { Entity, Column, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, JoinTable, OneToOne, OneToMany, JoinColumn} from "typeorm";
import { BuyerEntity } from "../buyer/buyer.entity";
import { LetterEntity } from "../letter/letter.entity";
import { CostsEntity } from "../costs/costs.entity";

@Entity('endorsment')
export class EndorsmentEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'decimal'})
    tea:number

    @Column('datetime')
    paidDate:Date


    @Column()
    name:number

    @Column('decimal')
    discountedAmount:number


    @Column('datetime')
    sellDate:Date

    @Column('decimal')
    tcea:number

    @Column()
    ruc:number

    @ManyToOne(type=>BuyerEntity, buyer => buyer.endorsment,{onDelete: 'CASCADE'})
    buyer:BuyerEntity;

    @OneToOne(type=> LetterEntity,letter => letter.endorsment) 
    @JoinColumn(    )
    letter:LetterEntity

    
    @OneToMany(type => CostsEntity , costs => costs.endorsment,{ cascade: ['insert', 'update'] })
    costs : CostsEntity[];
}

