import { Injectable, HttpException, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LetterEntity } from './letter.entity'
import {  UserEntity } from "../user/user.entity";
import {  EndorsmentEntity } from "../endorsement/endorsment.entity";
import { Repository } from 'typeorm';



@Injectable()
export class LetterService {

    constructor(
        @InjectRepository(LetterEntity)
        private LetterRepository: Repository<LetterEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(LetterEntity)
        private letterRepository: Repository<LetterEntity>,
    ){}

    public async getAllLetters()
    {        
        return await this.LetterRepository.find();
    }

    public async getLetterByUser(userID: any)
    {
        let res = await this.LetterRepository.find({where: {user:userID}})
        // if (res.length <1){ throw 'This user doesnt have letters.';}
        console.log(res.length);
        return res;
    }

    public async editLetter(EditedLetter: LetterEntity, id)
    {
        let res;
        let err;
        let Letters = await this.LetterRepository.findOne({id: id});
        try {
            if (Letters == null) { throw 'this Letter doesnt exist';}
            res = await this.LetterRepository.update(Letters,EditedLetter);
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

    public async deleteLetter(id)
    {
        let res;
        let err;
        let letter = await this.LetterRepository.findOne({id:id});

        try {
            if (letter != null) {
                res = await this.LetterRepository.delete({id:id});
                console.log(res);                
            } else {
                throw "Letter doesnt exist";
                
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

    public async createLetter( letter: LetterEntity)
    {
        let res;
        let err;
        try {            
            res = await this.LetterRepository.insert(letter);

        } catch (error) {
            console.log(error);
            err = error;                 
        }

        return (
            err || {
                message: 'Created',
                created: true,
                id: letter.id
            }
        );
    }
}
