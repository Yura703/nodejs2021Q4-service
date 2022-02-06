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
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('boards')
@UseGuards(JwtAuthGuard)
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

  @Get('/:boardId/tasks/:id')
  async findOne(
    @Param('id') taskId: string,
    @Param('boardId') boardId: string,
  ) {
    const task = await this.tasksService.findOne(taskId, boardId);
    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  @Put('/:boardId/tasks/:id')
  update(
    @Param('boardId') boardId: string,
    @Param('id') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(boardId, taskId, updateTaskDto);
  }

  @Delete('/:boardId/tasks/:id')
  async remove(@Param('boardId') boardId: string, @Param('id') taskId: string) {
    const user = await this.tasksService.remove(boardId, taskId);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
