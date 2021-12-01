const RepositoryBoards = require('./board.memory.repository');

const findById = (id) => RepositoryBoards.findById(id);

const findAll = () => RepositoryBoards.findAll();

const createBoard = (board) => RepositoryBoards.createboard(board);

const editBoard = (id, board) => RepositoryBoards.editboard(id, board);

const deleteBoard = (id) => RepositoryBoards.deleteboard(id);

module.exports = { findById, findAll, createBoard, editBoard, deleteBoard };
