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
  import { EndorsmentService } from './endorsment.service';
  import { EndorsmentEntity } from "./endorsment.entity";

@Controller('endorsment')
export class EndorsmentController {
    constructor(private endorsmentService: EndorsmentService){}

    @Get()
    public async getAllEndorsments(@Res() res, @Req() req){
        const endorsments = await this.endorsmentService.getAllEndorsment();
        console.log(req.payload);
        res.status(HttpStatus.OK).json(endorsments);
    } 

    @Get(':userid')
    public async getEndorsmentsByUserID(@Res() res, @Param('userid') userid){
        const endorsments = await this.endorsmentService.getEndorsmentByUser(userid);
        res.status(HttpStatus.OK).json(endorsments);
    }

    @Put(':id')
    public async updateEndorsment(@Res() res, @Body() updatedEndorsment : EndorsmentEntity, @Param('id') id)
    {
        const result = await this.endorsmentService.editEndorsment(updatedEndorsment,id);
        res.status(HttpStatus.ACCEPTED).json(result);
    } 
    












}
