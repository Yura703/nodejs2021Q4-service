import RepositoryUsers from './user.memory.repository';
import RepositoryTasks from '../tasks/task.memory.repository';
import User from './user.model';

const findById = (id: string) => RepositoryUsers.findById(id);

const findAll = () => RepositoryUsers.findAll();

const createUser = (user: User) => RepositoryUsers.createUser(user);

const editUser = (id: string, user: User) => RepositoryUsers.editUser(id, user);

const deleteUser = (id: string) => {
  RepositoryUsers.deleteUser(id);
  RepositoryTasks.updateTaskByUserId(id);
};

export = { findById, findAll, createUser, editUser, deleteUser };
