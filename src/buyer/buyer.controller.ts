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
  import { BuyerService } from './buyer.service';
  import { BuyerEntity } from "./buyer.entity";

@Controller('buyer')
export class BuyerController {
    constructor(private BuyerService: BuyerService){}

    @Get()
    public async getAllBuyers(@Res() res, @Req() req){
        const Buyers = await this.BuyerService.getAllUserCommmand();
        console.log(req.payload);
        
        
        res.status(HttpStatus.OK).json(Buyers);
    } 

    @Get(':userid')
    public async getBuyersByUserID(@Res() res, @Param('userid') userid){
        const Buyers = await this.BuyerService.getBuyerByUser(userid);
        res.status(HttpStatus.OK).json(Buyers);
    }

    @Put(':id')
    public async updateBuyer(@Res() res, @Body() updatedBuyer : BuyerEntity, @Param('id') id)
    {
        const result = await this.BuyerService.editBuyer(updatedBuyer,id);
        res.status(HttpStatus.ACCEPTED).json(result);
    } 
    












}
