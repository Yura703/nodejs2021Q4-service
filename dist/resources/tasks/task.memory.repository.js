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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var task_model_1 = require("./task.model");
var board_memory_repository_1 = __importDefault(require("../boards/board.memory.repository"));
var ITEM_NOT_FOUND = -1;
var RepositoryTask = /** @class */ (function () {
    /**
     * Constructor that creates instances of the class RepositoryTask
     * @returns empty array
     */
    function RepositoryTask() {
        this.arrayTask = [];
    }
    /**
    * Get object Task by ID from Repository
    * @param boardId - board ID where the task is located
    * @param taskId - object Task ID in uuid format
    * @returns object Task or error message
    */
    RepositoryTask.prototype.findById = function (boardId, taskId) {
        var index = this.receiveTaskId(taskId);
        if (index === ITEM_NOT_FOUND || !RepositoryTask.receiveBoardId(boardId)) {
            return "id isn'not valid";
        }
        return this.arrayTask[index];
    };
    /**
     * Get all objects Task from Repository
     * @param boardId - board ID where the task is located
     * @returns all objects Task from Repository
     */
    RepositoryTask.prototype.findAll = function (boardId) {
        if (!RepositoryTask.receiveBoardId(boardId)) {
            return "id isn'not valid";
        }
        return this.arrayTask.filter(function (task) { return task.boardId === boardId; });
    };
    /**
    * Create new object Task in Repository
    * @param boardId - board ID where the task is located
    * @param task - the Task object received from the user
    * @returns task object created in the Repository
    */
    RepositoryTask.prototype.createTask = function (boardId, task) {
        if (!RepositoryTask.receiveBoardId(boardId)) {
            return "id isn'not valid";
        }
        var createTask = new task_model_1.Task(task);
        createTask.boardId = boardId;
        this.arrayTask.push(createTask);
        return createTask;
    };
    /**
     * Modifying the Task object while keeping the original ID
     * @param boardId - board ID where the task is located
     * @param taskId - the id of the Task object to be modified
     * @param task - Task object with new data
     * @returns a Task object saved in the Repository after a change or an error message
     */
    RepositoryTask.prototype.editTask = function (boardId, taskId, task) {
        var index = this.receiveTaskId(taskId);
        if (index === ITEM_NOT_FOUND || !RepositoryTask.receiveBoardId(boardId)) {
            return "id isn'not valid";
        }
        var createtask = new task_model_1.Task(task);
        createtask.id = taskId;
        createtask.boardId = boardId;
        this.arrayTask[index] = createtask;
        return createtask;
    };
    /**
     * Removing a Task object by ID from the Repository
     * @param boardId - board ID where the task is located
     * @param taskId - ID of the Task object to remove
     * @returns true on success, on error - an error message
     */
    RepositoryTask.prototype.deleteTask = function (boardId, taskId) {
        return __awaiter(this, void 0, void 0, function () {
            var index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        index = this.receiveTaskId(taskId);
                        if (index === ITEM_NOT_FOUND || !RepositoryTask.receiveBoardId(boardId)) {
                            return [2 /*return*/, "id isn'not valid"];
                        }
                        return [4 /*yield*/, this.arrayTask.splice(index, 1)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    /**
     * Deleting Tasks when deleting a board
     * @param boardId - Remote Board ID
     * @returns number of remote objects
     */
    RepositoryTask.prototype.deleteTaskByBoardId = function (boardId) {
        var tempArray = this.arrayTask.filter(function (task) { return task.boardId !== boardId; });
        this.arrayTask = tempArray;
        return this.arrayTask.length - tempArray.length;
    };
    /**
     * Updating Tasks when deleting a user
     * @param userId - userId to update Task
     * @returns Promise task or true
     */
    RepositoryTask.prototype.updateTaskByUserId = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var tempArray;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.arrayTask.map(function (task) {
                            var _task = task;
                            if (_task.userId === userId) {
                                _task.userId = null;
                            }
                            return _task;
                        })];
                    case 1:
                        tempArray = _a.sent();
                        this.arrayTask = tempArray;
                        return [2 /*return*/, true];
                }
            });
        });
    };
    /**
     * Searching the TaskRepository for an object with a given ID
     * @param id - Object ID to search
     * @returns index of the object with the given ID in the Repository array, or -1 if it is absent
     */
    RepositoryTask.prototype.receiveTaskId = function (taskId) {
        return this.arrayTask.findIndex(function (task) { return task.id === taskId; });
    };
    /**
     * Сhecks for the presence in the BoardRepository of an object with the given ID
     * @param id - Object ID to search
     * @returns true with a positive search, folse with a negative search
     */
    RepositoryTask.receiveBoardId = function (boardId) {
        var result = board_memory_repository_1.default.findById(boardId);
        return typeof result !== 'string';
    };
    return RepositoryTask;
}());
module.exports = new RepositoryTask();
