const RepositoryBoards = require('./board.memory.repository');
const RepositoryTasks = require('../tasks/task.memory.repository');

const findById = (id) => RepositoryBoards.findById(id);

const findAll = () => RepositoryBoards.findAll();

const createBoard = (board) => RepositoryBoards.createBoard(board);

const editBoard = (id, board) => RepositoryBoards.editBoard(id, board);

const deleteBoard = (id) => {
  RepositoryBoards.deleteBoard(id);
  RepositoryTasks.deleteTaskByBoardId(id);
};

module.exports = { findById, findAll, createBoard, editBoard, deleteBoard };
