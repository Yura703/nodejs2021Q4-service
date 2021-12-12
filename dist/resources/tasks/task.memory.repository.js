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
    /**
     * Constructor that creates instances of the class RepositoryTask
     * @returns empty array
     */
    constructor() {
        this.arrayTask = [];
    }
    /**
    * Get object Task by ID from Repository
    * @param id - object Task ID in uuid format
    * @returns object Task or error message
    */
    findById(boardId, taskId) {
        const index = this.receiveTaskId(taskId);
        if (index === ITEM_NOT_FOUND || !RepositoryTask.receiveBoardId(boardId)) {
            return "id isn'not valid";
        }
        return this.arrayTask[index];
    }
    /**
     * Get all objects Task from Repository
     * @returns all objects Task from Repository
     */
    findAll(boardId) {
        if (!RepositoryTask.receiveBoardId(boardId)) {
            return "id isn'not valid";
        }
        return this.arrayTask.filter((task) => task.boardId === boardId);
    }
    /**
    * Create new object Task in Repository
    * @param task - the Task object received from the user
    * @returns task object created in the Repository
    */
    createTask(boardId, task) {
        if (!RepositoryTask.receiveBoardId(boardId)) {
            return "id isn'not valid";
        }
        const createTask = new task_model_1.Task(task);
        createTask.boardId = boardId;
        this.arrayTask.push(createTask);
        return createTask;
    }
    /**
     * Modifying the Task object while keeping the original ID
     * @param id - the id of the Task object to be modified
     * @param task - Task object with new data
     * @returns a Task object saved in the Repository after a change or an error message
     */
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
    /**
     * Removing a Task object by ID from the Repository
     * @param id - ID of the Task object to remove
     * @returns true on success, on error - an error message
     */
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
    /**
     * Deleting Tasks when deleting a board
     * @param boardId - Remote Board ID
     * @returns number of remote objects
     */
    deleteTaskByBoardId(boardId) {
        const tempArray = this.arrayTask.filter((task) => task.boardId !== boardId);
        this.arrayTask = tempArray;
        return this.arrayTask.length - tempArray.length;
    }
    /**
     * Updating Tasks when deleting a user
     * @param userId - userId to update Task
     * @returns Promise task or true
     */
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
    /**
     * Searching the TaskRepository for an object with a given ID
     * @param id - Object ID to search
     * @returns index of the object with the given ID in the Repository array, or -1 if it is absent
     */
    receiveTaskId(taskId) {
        return this.arrayTask.findIndex((task) => task.id === taskId);
    }
    /**
     * Сhecks for the presence in the BoardRepository of an object with the given ID
     * @param id - Object ID to search
     * @returns true with a positive search, folse with a negative search
     */
    static receiveBoardId(boardId) {
        const result = board_memory_repository_1.default.findById(boardId);
        return typeof result !== 'string';
    }
}
module.exports = new RepositoryTask();
