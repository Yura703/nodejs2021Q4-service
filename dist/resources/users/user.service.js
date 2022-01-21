"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const user_repository_1 = __importDefault(require("./user.repository"));
const findById = (id) => user_repository_1.default.findById(id);
const findAll = () => user_repository_1.default.findAll();
const createUser = (user) => user_repository_1.default.createUser(user);
const editUser = (id, user) => user_repository_1.default.editUser(id, user);
const deleteUser = (id) => user_repository_1.default.deleteUser(id);
module.exports = { findById, findAll, createUser, editUser, deleteUser };
