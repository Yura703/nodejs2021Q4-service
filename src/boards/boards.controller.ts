import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BoardsService } from './boards.service';
import { BoardDto } from './dto/board.dto';

@Controller('boards')
@UseGuards(JwtAuthGuard)
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  create(@Body() boardDto: BoardDto) {
    return this.boardsService.create(boardDto);
  }

  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const board = this.boardsService.findOne(id);
    if (board) {
      return board;
    }
    throw new NotFoundException();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() boardDto: BoardDto) {
    const board = this.boardsService.update(id, boardDto);
    if (board) {
      return board;
    }
    throw new NotFoundException();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const board = this.boardsService.remove(id);
    if (!board) {
      throw new NotFoundException();
    }
    return board;
  }
}
