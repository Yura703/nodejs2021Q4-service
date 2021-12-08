"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const user_memory_repository_1 = __importDefault(require("./user.memory.repository"));
const task_memory_repository_1 = __importDefault(require("../tasks/task.memory.repository"));
const findById = (id) => user_memory_repository_1.default.findById(id);
const findAll = () => user_memory_repository_1.default.findAll();
const createUser = (user) => user_memory_repository_1.default.createUser(user);
const editUser = (id, user) => user_memory_repository_1.default.editUser(id, user);
const deleteUser = (id) => {
    user_memory_repository_1.default.deleteUser(id);
    task_memory_repository_1.default.updateTaskByUserId(id);
};
module.exports = { findById, findAll, createUser, editUser, deleteUser };
