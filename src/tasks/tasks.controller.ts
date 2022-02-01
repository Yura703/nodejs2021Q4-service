import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('boards')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('/:boardId/tasks')
  create(
    @Body() createTaskDto: CreateTaskDto,
    @Param('boardId') boardId: string,
  ) {
    return this.tasksService.create(createTaskDto, boardId);
  }

  @Get('/:boardId/tasks')
  findAll(@Param('boardId') boardId: string) {
    return this.tasksService.findAll(boardId);
  }

  @Get('/:boardId/tasks/:taskId')
  findOne(@Param('id') taskId: string, @Param('boardId') boardId: string) {
    const task = this.tasksService.findOne(taskId, boardId);
    if (task) {
      return task;
    }
    throw new NotFoundException();
  }

  @Put('/:boardId/tasks')
  update(
    @Param('id') taskId: string,
    @Param('boardId') boardId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const user = this.tasksService.findOne(taskId, boardId);
    if (user) {
      return this.tasksService.update(taskId, boardId, updateTaskDto);
    }
    throw new NotFoundException();
  }

  @Delete('/:boardId/tasks')
  remove(@Param('id') taskId: string, @Param('boardId') boardId: string) {
    const user = this.tasksService.remove(taskId, boardId);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
