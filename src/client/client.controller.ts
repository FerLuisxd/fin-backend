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
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private clientsService: ClientService) {}

  @Get()
  public async getAllClients(@Res() res) {
    console.log('clients');
    const clients = await this.clientsService.getAllClients();
    res.status(HttpStatus.OK).json(clients);
  }
  @Get('/afterLogin')
  public async getClientInfo(@Res()res ,@Req() req){
    console.log("req!", req.payload)
    const client = await this.clientsService.getClient(req.payload.name);
    res.status(HttpStatus.OK).json({client:client[0]});
  }   
  @Get('/:id')
  public async getClient(@Res() res, @Param('id') id) {
    const client = await this.clientsService.getClient(id);
    res.status(HttpStatus.OK).json(client);
  }

  @Post()
  public async createClient(
    @Res() res,
    @Body('ruc') ruc,
    @Body('rs') rs,
    @Body('name') name,
    @Body('add') add,
  ) {
    const result = await this.clientsService.createClient(
      ruc,
      rs,
      name,
      add
    );
    res.status(HttpStatus.CREATED).json(result);
  }

  @Put('/:id')
  public async updateClient(
    @Res() res,
    @Param('id') id,
    @Body('clientname') clientname,
    @Body('email') email,
    @Body('password') password,
    @Body('role') role,
  ) {
    const result = await this.clientsService.updateClient(
      id,
      clientname,
      email,
      password,
      role,
    );
    res.status(HttpStatus.ACCEPTED).json(result);
  }

  @Delete('/:id')
  public async deleteClient(@Res() res, @Param('id') id) {
    const result = await this.clientsService.deleteClient(id);
    res.status(HttpStatus.ACCEPTED).json(result);
  }
}
