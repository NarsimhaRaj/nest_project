import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/authguard/auth.guard';
import { UserDto } from './dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/getAllUsers')
  @UseGuards(AuthGuard)
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @Post('/login')
  async login(@Session() session: Record<string, any>, @Body() req: any) {
    return this.userService.login(session, req);
  }

  @Post('/createUser')
  @UseGuards(AuthGuard)
  async createUser(@Body() req: UserDto) {
    return this.userService.createUser(req);
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() req: UserDto,
  ) {
    return this.userService.updateUser(id, req);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
