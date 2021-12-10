import { Board } from "./board.model";
import RepositoryBoards from './board.memory.repository';
import RepositoryTasks from '../tasks/task.memory.repository';

/**
 * Get object Board by ID from Repository
  * @param id - object Board ID in uuid format
  * @returns objects Board by ID from Repository 
 */
const findById = (id: string) => RepositoryBoards.findById(id);

/**
 *  Get all objects Board from Repository 
 *  @returns all objects Board from Repository 
 */
const findAll = () => RepositoryBoards.findAll();

/**
  * Create new object Board in Repository 
  * @param board - the Board object received from the user
  * @returns board object created in the Repository
 */
const createBoard = (board: Board) => RepositoryBoards.createBoard(board);

/**
 * Modifying the Board object while keeping the original ID
   * @param id - the id of the Board object to be modified
   * @param board - Board object with new data
   * @returns a Board object saved in the Repository after a change or an error message
 */
const editBoard = (id: string, board: Board) => RepositoryBoards.editBoard(id, board);

/**
  * Removing a Board object by ID and tasks from the removed board from the Repository
   * @param id - D of the Board object to remove 
   * @returns true on success, on error - an error message
 */
const deleteBoard = (id: string) => {
  RepositoryBoards.deleteBoard(id);
  RepositoryTasks.deleteTaskByBoardId(id);
};

export = { findById, findAll, createBoard, editBoard, deleteBoard };
