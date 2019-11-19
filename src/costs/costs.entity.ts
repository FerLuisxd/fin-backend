import { Entity, Column, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, JoinTable, OneToMany} from "typeorm";
import { UserEntity } from "../user/user.entity";
import { EndorsmentEntity } from "../endorsement/endorsment.entity";


@Entity('costs')
export class CostsEntity {//a
  @PrimaryGeneratedColumn()
  id:number


  @Column()
  name:string

  @Column('decimal')
  amount:number


  @Column('tinyint')
  start:boolean

  @ManyToOne(type=>EndorsmentEntity, endorsment => endorsment.costs)
  endorsment:EndorsmentEntity;
}

