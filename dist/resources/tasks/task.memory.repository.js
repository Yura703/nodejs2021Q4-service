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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const task_model_1 = require("./task.model");
const board_memory_repository_1 = __importDefault(require("../boards/board.memory.repository"));
const ITEM_NOT_FOUND = -1;
class RepositoryTask {
    constructor() {
        this.arrayTask = [];
    }
    // get
    findById(boardId, taskId) {
        const index = this.receiveTaskId(taskId);
        if (index === ITEM_NOT_FOUND || !RepositoryTask.receiveBoardId(boardId)) {
            return "id isn'not valid";
        }
        return this.arrayTask[index];
    }
    findAll(boardId) {
        if (!RepositoryTask.receiveBoardId(boardId)) {
            return "id isn'not valid";
        }
        return this.arrayTask.filter((task) => task.boardId === boardId);
    }
    // post
    createTask(boardId, task) {
        if (!RepositoryTask.receiveBoardId(boardId)) {
            return "id isn'not valid";
        }
        const createTask = new task_model_1.Task(task);
        createTask.boardId = boardId;
        this.arrayTask.push(createTask);
        return createTask;
    }
    // put
    editTask(boardId, taskId, task) {
        const index = this.receiveTaskId(taskId);
        if (index === ITEM_NOT_FOUND || !RepositoryTask.receiveBoardId(boardId)) {
            return "id isn'not valid";
        }
        const createtask = new task_model_1.Task(task);
        createtask.id = taskId;
        createtask.boardId = boardId;
        this.arrayTask[index] = createtask;
        return createtask;
    }
    // delete
    deleteTask(boardId, taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.receiveTaskId(taskId);
            if (index === ITEM_NOT_FOUND || !RepositoryTask.receiveBoardId(boardId)) {
                return "id isn'not valid";
            }
            yield this.arrayTask.splice(index, 1);
            return true;
        });
    }
    // When somebody DELETEs Board, all its Tasks should be deleted as well.
    deleteTaskByBoardId(boardId) {
        const tempArray = this.arrayTask.filter((task) => task.boardId !== boardId);
        this.arrayTask = tempArray;
        return this.arrayTask.length - tempArray.length;
    }
    // When somebody DELETEs User, all Tasks where User is assignee should be updated to put userId = null.
    updateTaskByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tempArray = yield this.arrayTask.map((task) => {
                const _task = task;
                if (_task.userId === userId) {
                    _task.userId = null;
                }
                return _task;
            });
            this.arrayTask = tempArray;
            return true;
        });
    }
    receiveTaskId(taskId) {
        return this.arrayTask.findIndex((task) => task.id === taskId);
    }
    static receiveBoardId(boardId) {
        const result = board_memory_repository_1.default.findById(boardId);
        return typeof result !== 'string';
    }
}
module.exports = new RepositoryTask();
