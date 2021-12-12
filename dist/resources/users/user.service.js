"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var user_memory_repository_1 = __importDefault(require("./user.memory.repository"));
var task_memory_repository_1 = __importDefault(require("../tasks/task.memory.repository"));
var findById = function (id) { return user_memory_repository_1.default.findById(id); };
var findAll = function () { return user_memory_repository_1.default.findAll(); };
var createUser = function (user) { return user_memory_repository_1.default.createUser(user); };
var editUser = function (id, user) { return user_memory_repository_1.default.editUser(id, user); };
var deleteUser = function (id) {
    user_memory_repository_1.default.deleteUser(id);
    task_memory_repository_1.default.updateTaskByUserId(id);
};
module.exports = { findById: findById, findAll: findAll, createUser: createUser, editUser: editUser, deleteUser: deleteUser };
