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
  import { CostsService } from './costs.service';
  import { CostsEntity } from "./costs.entity";

@Controller('   costs')
export class CostsController {
    constructor(private CostsService: CostsService){}

    @Get()
    public async getAllCostss(@Res() res, @Req() req){
        const Costss = await this.CostsService.getAllUserCommmand();
        console.log(req.payload);
        
        
        res.status(HttpStatus.OK).json(Costss);
    } 

    @Get(':userid')
    public async getCostssByUserID(@Res() res, @Param('userid') userid){
        const Costss = await this.CostsService.getCostsByUser(userid);
        res.status(HttpStatus.OK).json(Costss);
    }

    @Put(':id')
    public async updateCosts(@Res() res, @Body() updatedCosts : CostsEntity, @Param('id') id)
    {
        const result = await this.CostsService.editCosts(updatedCosts,id);
        res.status(HttpStatus.ACCEPTED).json(result);
    } 
    












}
