"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const task_repository_1 = __importDefault(require("./task.repository"));
const findById = (boardId, taskId) => task_repository_1.default.findById(boardId, taskId);
const findAll = (boardId) => task_repository_1.default.findAll(boardId);
const createTask = (boardId, task) => task_repository_1.default.createTask(boardId, task);
const editTask = (boardId, taskId, task) => task_repository_1.default.editTask(boardId, taskId, task);
const deleteTask = (boardId, taskId) => task_repository_1.default.deleteTask(boardId, taskId);
module.exports = {
    findById,
    findAll,
    createTask,
    editTask,
    deleteTask,
};
