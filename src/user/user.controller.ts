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
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  @Get()
  public async getAllUsers(@Res() res) {
    console.log('users');
    const users = await this.usersService.getAllUsers();
    res.status(HttpStatus.OK).json(users);
  }
  @Get('/afterLogin')
  public async getUserInfo(@Res()res ,@Req() req){
    console.log("req!", req.payload)
    const user = await this.usersService.getUser(req.payload.name);
    res.status(HttpStatus.OK).json({user:user[0]});
  }   
  @Get('/:id')
  public async getUser(@Res() res, @Param('id') id) {
    const user = await this.usersService.getUser(id);
    res.status(HttpStatus.OK).json(user);
  }

  @Post()
  public async createUser(
    @Res() res,
    @Body('username') username,
    @Body('email') email,
    @Body('password') password,
  ) {
    const result = await this.usersService.createUser(
      username,
      email,
      password,
    );
    res.status(HttpStatus.CREATED).json(result);
  }

  @Put('/:id')
  public async updateUser(
    @Res() res,
    @Param('id') id,
    @Body('username') username,
    @Body('email') email,
    @Body('password') password,
    @Body('role') role,
  ) {
    const result = await this.usersService.updateUser(
      id,
      username,
      email,
      password,
      role,
    );
    res.status(HttpStatus.ACCEPTED).json(result);
  }

  @Delete('/:id')
  public async deleteUser(@Res() res, @Param('id') id) {
    const result = await this.usersService.deleteUser(id);
    res.status(HttpStatus.ACCEPTED).json(result);
  }
}
