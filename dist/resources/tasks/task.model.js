"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
var uuid_1 = require("uuid");
var Task = /** @class */ (function () {
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
    function Task(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.title, title = _c === void 0 ? 'TASK' : _c, _d = _b.order, order = _d === void 0 ? 0 : _d, _e = _b.description, description = _e === void 0 ? '' : _e, _f = _b.userId, userId = _f === void 0 ? null : _f, _g = _b.boardId, boardId = _g === void 0 ? '' : _g, _h = _b.columnId, columnId = _h === void 0 ? null : _h;
        this.id = (0, uuid_1.v4)();
        this.title = title;
        this.order = order;
        this.description = description;
        this.userId = userId;
        this.boardId = boardId;
        this.columnId = columnId;
    }
    return Task;
}());
exports.Task = Task;
