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
  import { CommandService } from './command.service';
  import { CommandEntity } from "./command.entity";
  import { UserCommandService } from '../user-command/user-command.service'

@Controller('command')
export class CommandController {
    constructor(private commandService: CommandService, private userCommandService: UserCommandService){}

    @Get()
    public async getAllCommands(@Res() res) {   
        console.log("Entre");     
        const commands = await this.commandService.getAllCommands();
        res.status(HttpStatus.OK).json(commands);
    }

    @Get(':id')
    public async getCommand(@Res() res, @Param('id') id){
        const command = await this.commandService.getCommandById(id);
        res.status(HttpStatus.OK).json(command);

    }

    @Post()
    public async createCommand(@Res() res, @Body() newCommand : CommandEntity, @Req() req){
        
        const result = await this.commandService.createCommand(newCommand);
        const result2 = await this.userCommandService.createUserCommand(req.payload.id, newCommand);
        res.status(HttpStatus.CREATED).json(result);
    }

    @Put(':id')
    public async updateCommand(@Res() res, @Body() updatedCommand : CommandEntity, @Param('id') id)
    {
        const result = await this.commandService.editCommand(updatedCommand,id);
        res.status(HttpStatus.ACCEPTED).json(result);
    } 

    @Put('delete/:id')
    public async deleteCommand(@Res() res, @Param('id') id)
    {
        const result = await this.commandService.deleteCommand(id);
        res.status(HttpStatus.ACCEPTED).json(result);
        
    }

    
    @Put('usable/:id')
    public async usableON(@Res() res, @Param('id') id)
    {
        const result = await this.commandService.usableON(id);
        res.status(HttpStatus.ACCEPTED).json(result);
        
    }

}
