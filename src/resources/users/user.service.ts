import { UserController } from './user.repository';
//import RepositoryTasks from '../tasks/task.repository';
import { User } from './user.model';

const userController = new UserController();

const findById = (id: string) => userController.findById(id);

const findAll = () => userController.findAll();

const createUser = (user: User) => userController.createUser(user);

const editUser = (id: string, user: User) => userController.editUser(id, user);

const deleteUser = (id: string) => {
  userController.deleteUser(id);
  //RepositoryTasks.updateTaskByUserId(id);
};

export = { findById, findAll, createUser, editUser, deleteUser };
