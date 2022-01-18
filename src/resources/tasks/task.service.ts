import taskController from './task.repository';
import { Task } from './task.model';


const findById = (boardId: string, taskId: string) => taskController.findById(boardId, taskId);

const findAll = (boardId: string) => taskController.findAll(boardId);

const createTask = (boardId: string, task: Task) => taskController.createTask(boardId, task);

const editTask = (boardId: string, taskId: string, task: Task) =>
taskController.editTask(boardId, taskId, task);
  
const deleteTask = (boardId: string, taskId: string) =>
taskController.deleteTask(boardId, taskId);
 
const deleteTaskByBoardId = (id: string) => taskController.deleteTaskByBoardId(id);

export = {
  findById,
  findAll,
  createTask,
  editTask,
  deleteTask,
  deleteTaskByBoardId,
};
