import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const user = this.usersService.findOne(id);
    if (user) {
      return user;
    }
    throw new NotFoundException();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = this.usersService.update(id, updateUserDto);
    if (user) {
      return user;
    }
    throw new NotFoundException();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const user = this.usersService.remove(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
