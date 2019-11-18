import { Injectable, HttpException, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuyerEntity } from './buyer.entity'
import {  UserEntity } from "../user/user.entity";
import {  EndorsmentEntity } from "../endorsement/endorsment.entity";
import { Repository } from 'typeorm';



@Injectable()
export class BuyerService {

    constructor(
        @InjectRepository(BuyerEntity)
        private BuyerRepository: Repository<BuyerEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(BuyerEntity)
        private buyerRepository: Repository<BuyerEntity>,
    ){}

    public async getAllUserCommmand()
    {        
        return await this.BuyerRepository.find({ relations: ["user", "buyer"] });
    }

    public async getBuyerByUser(userID: any)
    {
        let res = await this.BuyerRepository.find({where: {user:userID}, relations: ["user", "buyer"]})
        // if (res.length <1){ throw 'This user doesnt have buyers.';}
        console.log(res.length);
        return res;
    }

    public async editBuyer(EditedBuyer: BuyerEntity, id)
    {
        let res;
        let err;
        let Buyers = await this.BuyerRepository.findOne({id: id});
        try {
            if (Buyers == null) { throw 'this Buyer doesnt exist';}
            res = await this.BuyerRepository.update(Buyers,EditedBuyer);
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

    public async deleteBuyer(id)
    {
        let res;
        let err;
        let buyer = await this.BuyerRepository.findOne({id:id});

        try {
            if (buyer != null) {
                res = await this.BuyerRepository.delete({id:id});
                console.log(res);                
            } else {
                throw "Buyer doesnt exist";
                
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

    public async createBuyer(userid: number, buyer: BuyerEntity)
    {
        let res;
        let err;
        let today = new Date();
        let NewBuyer = new BuyerEntity();
      
        try {            
            let user = await this.userRepository.findOne({id:userid});
            // NewBuyer. = buyer;
            // NewBuyer.user = user;
            // NewBuyer.registerDate = today;
            res = await this.BuyerRepository.insert(NewBuyer);

        } catch (error) {
            console.log(error);
            err = error;                 
        }

        return (
            err || {
                message: 'Created',
                created: true,
                id: NewBuyer.id
            }
        );
    }
}
