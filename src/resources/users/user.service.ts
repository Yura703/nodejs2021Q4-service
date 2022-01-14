import { UserController } from './user.repository';
import RepositoryTasks from '../tasks/task.memory.repository';
import { User } from './User';

const userController = new UserController();
/**
 * Get object User by ID from Repository
  * @param id - user ID in uuid format
  * @returns objects User by ID from Repository 
 */
const findById = (id: string) => userController.findById(id);

/**
 *  Get all objects User from Repository 
 *  @returns all objects User from Repository 
 */
const findAll = () => userController.findAll();

/**
  * Create new object User in Repository 
  * @param user - the User object received from the user
  * @returns user object created in the Repository
 */
const createUser = (user: User) => userController.createUser(user);

/**
 * Modifying the User object while keeping the original ID
   * @param id - the id of the User object to be modified
   * @param user - User object with new data
   * @returns a User object saved in the Repository after a change or an error message
 */
const editUser = (id: string, user: User) => userController.editUser(id, user);

/**
  * Removing a User object by ID and tasks from the removed user from the Repository
   * @param id - ID of the User object to remove 
   * @returns true on success, on error - an error message
 */
const deleteUser = (id: string) => {
  userController.deleteUser(id);
  RepositoryTasks.updateTaskByUserId(id);
};

export = { findById, findAll, createUser, editUser, deleteUser };
