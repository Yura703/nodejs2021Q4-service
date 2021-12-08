"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const uuid_1 = require("uuid");
function initColumns(columns) {
    if (Array.isArray(columns) && columns.length > 0) {
        const _columns = columns;
        for (let i = 0; i < _columns.length; i += 1) {
            _columns[i].id = (0, uuid_1.v4)();
        }
        return _columns;
    }
    return [];
}
class Board {
    constructor(board) {
        this.id = (0, uuid_1.v4)();
        this.title = board.title;
        this.columns = initColumns(board.columns);
    }
}
exports.Board = Board;
