"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_model_1 = require("./task.model");
const typeorm_1 = require("typeorm");
const findById = (boardID, taskID) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = yield (0, typeorm_1.getRepository)(task_model_1.Task);
    const task = yield repository.findOne({ where: { id: taskID, boardId: boardID } });
    if (!task) {
        return false;
    }
    return task;
});
const findAll = (boardID) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = yield (0, typeorm_1.getRepository)(task_model_1.Task);
    return repository.find(({ boardId: boardID }));
});
const createTask = (boardID, task) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = yield (0, typeorm_1.getRepository)(task_model_1.Task);
    const newTask = repository.create(Object.assign(Object.assign({}, task), { boardId: boardID }));
    yield repository.save(newTask);
    return newTask;
});
const editTask = (boardID, taskID, task) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = yield (0, typeorm_1.getRepository)(task_model_1.Task);
    const editTask = yield repository.findOne({ id: taskID, boardId: boardID });
    if (!editTask) {
        return false;
    }
    const _task = Object.assign(Object.assign({}, editTask), task);
    const newTask = yield repository.save(_task);
    return newTask;
});
const deleteTask = (boardID, taskID) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = yield (0, typeorm_1.getRepository)(task_model_1.Task);
    const delTask = yield repository.findOne({ id: taskID, boardId: boardID });
    if (!delTask) {
        return false;
    }
    yield repository.remove(delTask);
    return true;
});
exports.default = {
    findById,
    findAll,
    createTask,
    editTask,
    deleteTask,
};
