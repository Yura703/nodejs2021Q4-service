"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const task_memory_repository_1 = __importDefault(require("./task.memory.repository"));
/**
 * Get object Task by ID from Repository
 * @param boardId - board ID where the task is located
  * @param taskId - object Task ID in uuid format
  * @returns objects Task by ID from Repository
 */
const findById = (boardId, taskId) => task_memory_repository_1.default.findById(boardId, taskId);
/**
 *  Get all objects Task from Repository
 * @param boardId - board ID where the task is located
 *  @returns all objects Task from Repository
 */
const findAll = (boardId) => task_memory_repository_1.default.findAll(boardId);
/**
  * Create new object Task in Repository
  * @param boardId - board ID where the task is located
  * @param task - the Task object received from the user
  * @returns board object created in the Repository
 */
const createTask = (boardId, task) => task_memory_repository_1.default.createTask(boardId, task);
/**
 * Modifying the Task object while keeping the original ID   *
   * @param boardId - board ID where the task is located
   * @param taskId - the id of the Task object to be modified
   * @param task - Task object with new data
   * @returns a Task object saved in the Repository after a change or an error message
 */
const editTask = (boardId, taskId, task) => task_memory_repository_1.default.editTask(boardId, taskId, task);
/**
* Removing a Task object by ID from the Repository
* @param boardId - board ID where the task is located
 * @param taskId - ID of the Task object to remove
 * @returns true on success, on error - an error message
*/
const deleteTask = (boardId, taskId) => task_memory_repository_1.default.deleteTask(boardId, taskId);
/**
* Removing Task Objects from the Remote Board
 * @param id - ID of the Board object
 * @returns number of remote objects
*/
const deleteTaskByBoardId = (id) => task_memory_repository_1.default.deleteTaskByBoardId(id);
/**
  * Updating Tasks when deleting a user
   * @param id - ID of the User object
   * @returns Promise Task or true
 */
const updateTaskByUserId = (id) => task_memory_repository_1.default.updateTaskByUserId(id);
module.exports = {
    findById,
    findAll,
    createTask,
    editTask,
    deleteTask,
    deleteTaskByBoardId,
    updateTaskByUserId,
};
