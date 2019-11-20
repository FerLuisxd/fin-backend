import {
    Controller,
    Res,
    Get,
    Param,
    HttpStatus,
    Body,
    Put,
    Post,
    Delete,
    Req,
  } from '@nestjs/common';
  import { LetterService } from './letter.service';
  import { LetterEntity } from "./letter.entity";

@Controller('letter')
export class LetterController {
    constructor(private LetterService: LetterService){}

    @Get()
    public async getAllLetters(@Res() res, @Req() req){
        const Letters = await this.LetterService.getAllLetters();
        console.log(req.payload);
        
        
        res.status(HttpStatus.OK).json(Letters);
    } 

    @Get(':userid')
    public async getLettersByUserID(@Res() res, @Param('userid') userid){
        const Letters = await this.LetterService.getLetterByUser(userid);
        res.status(HttpStatus.OK).json(Letters);
    }

    @Put(':id')
    public async updateLetter(@Res() res, @Body() updatedLetter : LetterEntity, @Param('id') id)
    {
        const result = await this.LetterService.editLetter(updatedLetter,id);
        res.status(HttpStatus.ACCEPTED).json(result);
    } 
    @Post()
    public async createLetter(@Res()res,@Body() letter:LetterEntity){
        const result = await this.LetterService.createLetter(letter)
        res.status(HttpStatus.ACCEPTED).json(result)
    }
    












}
