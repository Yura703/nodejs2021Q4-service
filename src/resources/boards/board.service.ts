import { Board } from "./board.model";
import boardController from './board.repository';
//import RepositoryTasks from '../tasks/task.repository';

const findById = (id: string) => boardController.findById(id);

const findAll = () => boardController.findAll();

const createBoard = (board: Board) => boardController.createBoard(board);

const editBoard = (id: string, board: Board) => boardController.editBoard(id, board);

const deleteBoard = (id: string) => {
  boardController.deleteBoard(id);
  //RepositoryTasks.deleteTaskByBoardId(id);
};

export = { findById, findAll, createBoard, editBoard, deleteBoard };
