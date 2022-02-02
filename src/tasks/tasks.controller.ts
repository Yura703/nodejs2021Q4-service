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

  @Get('/:boardId/tasks/:id')
  findOne(@Param('id') taskId: string, @Param('boardId') boardId: string) {
    const task = this.tasksService.findOne(taskId, boardId);
    task.then((res) => {
      console.log(res);
      if (!res) return 'not Found';

      //throw new NotFoundException();
    });
    console.log('1111' + task);

    if (task) {
      return task;
    }
  }

  @Put('/:boardId/tasks/:id')
  update(
    @Param('id') taskId: string,
    @Param('boardId') boardId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(taskId, boardId, updateTaskDto);
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
