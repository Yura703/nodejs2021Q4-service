import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}
  async create(createTaskDto: CreateTaskDto, boardId: string) {
    const newTask = this.taskRepository.create({
      ...CreateTaskDto,
      boardId: boardId,
    });
    await this.taskRepository.save(newTask);

    return newTask;
  }

  findAll(_boardId: string) {
    return this.taskRepository.find({ boardId: _boardId });
  }

  findOne(boardId: string, taskId: string) {
    return this.taskRepository.findOne({
      where: { id: taskId, boardId: boardId },
    });
  }

  async update(boardId: string, taskId: string, updateTaskDto: UpdateTaskDto) {
    const editTask = await this.taskRepository.findOne({
      id: taskId,
      boardId: boardId,
    });
    if (!editTask) {
      return false;
    }
    const task = { ...editTask, ...updateTaskDto };
    const newTask = await this.taskRepository.save(task);
    return newTask;
  }

  async remove(boardId: string, taskId: string) {
    const delTask = await this.taskRepository.findOne({
      id: taskId,
      boardId: boardId,
    });
    if (!delTask) {
      return false;
    }
    await this.taskRepository.remove(delTask);

    return true;
  }
}
