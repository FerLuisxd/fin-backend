import { Entity, Column, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, JoinTable, OneToMany} from "typeorm";
import { UserEntity } from "../user/user.entity";


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
}

