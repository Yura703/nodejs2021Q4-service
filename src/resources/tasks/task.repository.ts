import { Task } from './task.model';
import { getRepository } from "typeorm";

const findById = async (boardID: string, taskID: string) => {
  const repository = await getRepository(Task);
  const task = await repository.findOne({where: {id: taskID, boardId:boardID}});
  if(!task) {

    return false;
  }
  return task;
}

const findAll = async (boardID: string) => {  
  const repository = await getRepository(Task);

  return repository.find(({ boardId: boardID }));
}

const createTask = async (boardID: string, task: Omit<Task, 'id'>) => {
  const repository = await getRepository(Task);
  const newTask = repository.create({...task, boardId: boardID});  
  await repository.save(newTask);

  return newTask;
}    

const editTask = async (boardID: string, taskID: string, task: Task) => {
  const repository = await getRepository(Task);
  const editTask = await repository.findOne({ id: taskID, boardId:boardID });
  if (!editTask) {
    return false;
  }
  const _task = { ...editTask, ...task };
  const newTask = await repository.save(_task);
  return newTask;
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

export default {
  findById,
  findAll,
  createTask,
  editTask,
  deleteTask,
}; 

  