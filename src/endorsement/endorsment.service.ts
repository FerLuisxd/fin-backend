import { Injectable, HttpException, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EndorsmentEntity } from './endorsment.entity'
import {  UserEntity } from "../user/user.entity";
import { Repository } from 'typeorm';



@Injectable()
export class EndorsmentService {

    constructor(
        @InjectRepository(EndorsmentEntity)
        private endorsmentRepository: Repository<EndorsmentEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ){}

    public async getAllEndorsment()
    {        
        return await this.endorsmentRepository.find({ relations: ["user", "endorsment"] });
    }

    public async getEndorsmentByUser(userID: any)
    {
        let res = await this.endorsmentRepository.find({where: {user:userID}, relations: ["user", "endorsment"]})
        // if (res.length <1){ throw 'This user doesnt have endorsments.';}
        console.log(res.length);
        return res;
    }

    public async editEndorsment(EditedEndorsment: EndorsmentEntity, id)
    {
        let res;
        let err;
        let endorsments = await this.endorsmentRepository.findOne({id: id});
        try {
            if (endorsments == null) { throw 'this endorsment doesnt exist';}
            res = await this.endorsmentRepository.update(endorsments,EditedEndorsment);
        } catch (error) {
            err = error;
            console.log(err);
            throw err;
        }

        return (
            err || {
                message: 'Updated',
                Updated: true,
                id: res.id,
            }

        )

    }

    public async deleteEndorsment(id)
    {
        let res;
        let err;
        let endorsment = await this.endorsmentRepository.findOne({id:id});

        try {
            if (endorsment != null) {
                res = await this.endorsmentRepository.delete({id:id});
                console.log(res);                
            } else {
                throw "endorsment doesnt exist";
                
            }
        } catch (error) {
            err = error;
            console.log(err);
            throw err;            
        }

        return (
            err || {
                message: "Eliminated",
                Eliminated: true,
                id: id,
            }
        );
    }

    public async createEndorsment(userid: number, endorsment: EndorsmentEntity)
    {
        let res;
        let err;
        let today = new Date();
        let NewEndorsment = new EndorsmentEntity();
      
        try {            
            // let user = await this.userRepository.findOne({id:userid});
            // NewEndorsment.endorsment = endorsment;
            // NewEndorsment.user = user;
            // NewEndorsment.registerDate = today;
            // res = await this.endorsmentRepository.insert(NewEndorsment);

        } catch (error) {
            console.log(error);
            err = error;                 
        }

        return (
            err || {
                message: 'Created',
                created: true,
                id: NewEndorsment.id,
            }
        );
    }
}
