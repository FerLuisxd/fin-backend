import { Injectable, HttpException, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CostsEntity } from './costs.entity'
import {  UserEntity } from "../user/user.entity";
import {  EndorsmentEntity } from "../endorsement/endorsment.entity";
import { Repository } from 'typeorm';



@Injectable()
export class CostsService {

    constructor(
        @InjectRepository(CostsEntity)
        private CostsRepository: Repository<CostsEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(CostsEntity)
        private costsRepository: Repository<CostsEntity>,
    ){}

    public async getAllUserCommmand()
    {        
        return await this.CostsRepository.find({ relations: ["user", "costs"] });
    }

    public async getCostsByUser(userID: any)
    {
        let res = await this.CostsRepository.find({where: {user:userID}, relations: ["user", "costs"]})
        // if (res.length <1){ throw 'This user doesnt have costss.';}
        console.log(res.length);
        return res;
    }

    public async editCosts(EditedCosts: CostsEntity, id)
    {
        let res;
        let err;
        let Costss = await this.CostsRepository.findOne({id: id});
        try {
            if (Costss == null) { throw 'this Costs doesnt exist';}
            res = await this.CostsRepository.update(Costss,EditedCosts);
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

    public async deleteCosts(id)
    {
        let res;
        let err;
        let costs = await this.CostsRepository.findOne({id:id});

        try {
            if (costs != null) {
                res = await this.CostsRepository.delete({id:id});
                console.log(res);                
            } else {
                throw "Costs doesnt exist";
                
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

    public async createCosts(userid: number, costs: CostsEntity)
    {
        let res;
        let err;
        let today = new Date();
        let NewCosts = new CostsEntity();
      
        try {            
            let user = await this.userRepository.findOne({id:userid});
            // NewCosts. = costs;
            // NewCosts.user = user;
            // NewCosts.registerDate = today;
            res = await this.CostsRepository.insert(NewCosts);

        } catch (error) {
            console.log(error);
            err = error;                 
        }

        return (
            err || {
                message: 'Created',
                created: true,
                id: NewCosts.id
            }
        );
    }
}
