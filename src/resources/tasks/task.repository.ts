import { Task } from './task.model';
import { getRepository } from "typeorm";
//import RepositoryBoard from '../boards/board.repository';

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
    
    return await this.taskRepository.update(({ id: taskID, boardId: boardID, task }));
  }

  async deleteTask(boardID: string, taskID: string) {

    return await this.taskRepository.delete(({  boardId: boardID, id: taskID }));
  }
  

  async deleteTaskByBoardId(boardID: string) {

    return await this.taskRepository.delete(({  boardId: boardID}));
  }
}
  

  