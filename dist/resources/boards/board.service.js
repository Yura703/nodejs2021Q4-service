"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const board_repository_1 = __importDefault(require("./board.repository"));
const findById = (id) => board_repository_1.default.findById(id);
const findAll = () => board_repository_1.default.findAll();
const createBoard = (board) => board_repository_1.default.createBoard(board);
const editBoard = (id, board) => board_repository_1.default.editBoard(id, board);
const deleteBoard = (id) => board_repository_1.default.deleteBoard(id);
module.exports = { findById, findAll, createBoard, editBoard, deleteBoard };
