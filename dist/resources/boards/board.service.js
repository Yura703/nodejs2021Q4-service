"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const board_memory_repository_1 = __importDefault(require("./board.memory.repository"));
const task_memory_repository_1 = __importDefault(require("../tasks/task.memory.repository"));
/**
 * Get object Board by ID from Repository
  * @param id - object Board ID in uuid format
  * @returns objects Board by ID from Repository
 */
const findById = (id) => board_memory_repository_1.default.findById(id);
/**
 *  Get all objects Board from Repository
 *  @returns all objects Board from Repository
 */
const findAll = () => board_memory_repository_1.default.findAll();
/**
  * Create new object Board in Repository
  * @param board - the Board object received from the user
  * @returns board object created in the Repository
 */
const createBoard = (board) => board_memory_repository_1.default.createBoard(board);
/**
 * Modifying the Board object while keeping the original ID
   * @param id - the id of the Board object to be modified
   * @param board - Board object with new data
   * @returns a Board object saved in the Repository after a change or an error message
 */
const editBoard = (id, board) => board_memory_repository_1.default.editBoard(id, board);
/**
  * Removing a Board object by ID and tasks from the removed board from the Repository
   * @param id - ID of the Board object to remove
   * @returns true on success, on error - an error message
 */
const deleteBoard = (id) => {
    board_memory_repository_1.default.deleteBoard(id);
    task_memory_repository_1.default.deleteTaskByBoardId(id);
};
module.exports = { findById, findAll, createBoard, editBoard, deleteBoard };
