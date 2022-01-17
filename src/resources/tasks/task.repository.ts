import { Task } from './task.model';
import { getRepository } from "typeorm";
import RepositoryBoard from '../boards/board.repository';

export class TaskController { 
  
  private taskRepository = getRepository(Task);

  async findById(boardID: string, taskID: string) {
    
    return await this.taskRepository.findOne({id: taskID, boardId:boardID});
  }

  async findAll(boardID: string) {  
    return await this.taskRepository.find(({ boardId: boardID }));
  }

  async createTask(boardID: string, task: Task) {
    
    return await this.taskRepository.save(({ boardId: boardID, task }));
  }    

  async editTask(boardID: string, taskID: string, task: Task) {
    
    return await this.taskRepository.update(({ taskId: taskID, boardId: boardID, task }));
  }

  async deleteTask(boardId: string, taskId: string) {
    
  }

  async deleteTaskByBoardId(boardId: string) {
    const tempArray = this.taskRepository.filter((task) => task.boardId !== boardId);
    this.taskRepository = tempArray;

    return this.taskRepository.length - tempArray.length;
  }

  async updateTaskByUserId(userId: string): Promise< Task | true> {
    const tempArray = await this.taskRepository.map((task) => {
      const _task = task;
      if (_task.userId === userId) {
        _task.userId = null;
      }
      return _task;
    });
    this.taskRepository = tempArray;

    return true;
  }

  async receiveTaskId(taskId: string) {
    return this.taskRepository.findIndex((task) => task.id === taskId);
  }

  static receiveBoardId(boardId: string) {
    const result = RepositoryBoard.findById(boardId);
    return typeof result !== 'string';
  }
}

export = new RepositoryTask();
