"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const uuid_1 = require("uuid");
class Task {
    /**
     * Constructor forming an object of the Task class
     * @param title - task name
     * @param order - number order
     * @param description - task description
     * @param userId - user id
     * @param boardId - board id
     * @param columnId - column id
     * @returns object of the Task class
     */
    constructor({ title = 'TASK', order = 0, description = '', userId = null, boardId = '', columnId = null, } = {}) {
        this.id = (0, uuid_1.v4)();
        this.title = title;
        this.order = order;
        this.description = description;
        this.userId = userId;
        this.boardId = boardId;
        this.columnId = columnId;
    }
}
exports.Task = Task;
