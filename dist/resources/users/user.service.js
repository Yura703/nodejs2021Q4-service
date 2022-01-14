"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const user_repository_1 = require("./user.repository");
const task_memory_repository_1 = __importDefault(require("../tasks/task.memory.repository"));
const userController = new user_repository_1.UserController();
/**
 * Get object User by ID from Repository
  * @param id - user ID in uuid format
  * @returns objects User by ID from Repository
 */
const findById = (id) => userController.findById(id);
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
const createUser = (user) => userController.createUser(user);
/**
 * Modifying the User object while keeping the original ID
   * @param id - the id of the User object to be modified
   * @param user - User object with new data
   * @returns a User object saved in the Repository after a change or an error message
 */
const editUser = (id, user) => userController.editUser(id, user);
/**
  * Removing a User object by ID and tasks from the removed user from the Repository
   * @param id - ID of the User object to remove
   * @returns true on success, on error - an error message
 */
const deleteUser = (id) => {
    userController.deleteUser(id);
    task_memory_repository_1.default.updateTaskByUserId(id);
};
module.exports = { findById, findAll, createUser, editUser, deleteUser };
