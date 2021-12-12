"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const uuid_1 = require("uuid");
/**
 * Adding an ID to the columns property in the Board object
 * @param columns - the columns property from the Board object received from the user
 * @returns property columns with generated ID
 */
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
    /**
     * Constructor forming an object of the Board class
     * @param board - the IBoard interface object received from the user
     *  @returns object of the Board class
     */
    constructor(board) {
        this.id = (0, uuid_1.v4)();
        this.title = board.title;
        this.columns = initColumns(board.columns);
    }
}
exports.Board = Board;
