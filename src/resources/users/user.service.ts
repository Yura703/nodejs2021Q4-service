import  userController from './user.repository';
import { User } from './user.model';



const findById = (id: string) => userController.findById(id);

const findAll = () => userController.findAll();

const createUser = (user: User) => userController.createUser(user);

const editUser = (id: string, user: User) => userController.editUser(id, user);

const deleteUser = (id: string) => userController.deleteUser(id);

export = { findById, findAll, createUser, editUser, deleteUser };
