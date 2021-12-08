import { Board } from "./board.model";
import RepositoryBoards from './board.memory.repository';
import RepositoryTasks from '../tasks/task.memory.repository';

const findById = (id: string) => RepositoryBoards.findById(id);

const findAll = () => RepositoryBoards.findAll();

const createBoard = (board: Board) => RepositoryBoards.createBoard(board);

const editBoard = (id: string, board: Board) => RepositoryBoards.editBoard(id, board);

const deleteBoard = (id: string) => {
  RepositoryBoards.deleteBoard(id);
  RepositoryTasks.deleteTaskByBoardId(id);
};

export = { findById, findAll, createBoard, editBoard, deleteBoard };
