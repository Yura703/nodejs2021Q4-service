import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardDto } from './dto/board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}
  async create(boardDto: BoardDto) {
    const newBoard = this.boardRepository.create({ ...boardDto });
    await this.boardRepository.save(newBoard);
    return newBoard;
  }

  findAll() {
    return this.boardRepository.find();
  }

  findOne(id: string) {
    return this.boardRepository.findOne(id);
  }

  async update(id: string, boardDto: BoardDto) {
    const editBoard = await this.boardRepository.findOne(id);
    if (!editBoard) {
      return false;
    }
    const _board = { ...editBoard, ...boardDto };
    await this.boardRepository.save(_board);
    return _board;
  }

  async remove(id: string) {
    const delBoard = await this.boardRepository.findOne(id);
    if (!delBoard) {
      return false;
    }
    await this.boardRepository.remove(delBoard);
    return true;
  }
}
