import { Entity, Column, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, JoinTable, OneToMany} from "typeorm";
import { UserEntity } from "../user/user.entity";
import { EndorsmentEntity } from "../endorsement/endorsment.entity";

@Entity('buyer')
export class BuyerEntity {
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

  @OneToMany(type => EndorsmentEntity , endorsment => endorsment.buyer)
  endorsment : EndorsmentEntity[];
}

