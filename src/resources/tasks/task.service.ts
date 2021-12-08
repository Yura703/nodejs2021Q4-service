import RepositoryTasks from './task.memory.repository';
import { Task, ITaskDto } from './task.model';

const findById = (boardId: string, taskId: string) => RepositoryTasks.findById(boardId, taskId);

const findAll = (boardId: string) => RepositoryTasks.findAll(boardId);

const createTask = (boardId: string, task: ITaskDto) => RepositoryTasks.createTask(boardId, task);

const editTask = (boardId: string, taskId: string, task: ITaskDto) =>
  RepositoryTasks.editTask(boardId, taskId, task);

const deleteTask = (boardId: string, taskId: string) =>
  RepositoryTasks.deleteTask(boardId, taskId);

const deleteTaskByBoardId = (id: string) => RepositoryTasks.deleteTaskByBoardId(id);

const updateTaskByUserId = (id: string) => RepositoryTasks.updateTaskByUserId(id);

export = {
  findById,
  findAll,
  createTask,
  editTask,
  deleteTask,
  deleteTaskByBoardId,
  updateTaskByUserId,
};
