import { Task } from './task.model';
import { getRepository } from "typeorm";
//import RepositoryBoard from '../boards/board.repository';

const findById = async (boardID: string, taskID: string) => {
  const repository = await getRepository(Task);

  return repository.findOne({id: taskID, boardId:boardID});
}

const findAll = async (boardID: string) => {  
  const repository = await getRepository(Task);

  return repository.find(({ boardId: boardID }));
}

const createTask = async (boardID: string, task: Omit<Task, 'id'>) => {
  const repository = await getRepository(Task);
  
  return await repository.save(({ boardId: boardID, task }));
}    

const editTask = async (boardID: string, taskID: string, task: Task) => {
  const repository = await getRepository(Task);
  const editTask = await repository.findOne({ id: taskID, boardId:boardID });
  if (!editTask) {
    return false;
  }
  const _task = { ...editTask, ...task };
  await repository.save(_task);
  return _task;
}

const deleteTask = async (boardID: string, taskID: string) => {
  const repository = await getRepository(Task);
  const delTask = await repository.findOne({ id: taskID, boardId:boardID });
  if (!delTask) {
    return false;
  }
  await repository.remove(delTask);
  return true;
}


const deleteTaskByBoardId = async (boardID: string) => {
  const repository = await getRepository(Task);

  return await repository.delete(({  boardId: boardID}));
}

export default {
  findById,
  findAll,
  createTask,
  editTask,
  deleteTask,
  deleteTaskByBoardId
}; 

  