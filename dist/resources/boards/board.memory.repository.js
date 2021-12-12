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
const board_model_1 = require("./board.model");
const ITEM_NOT_FOUND = -1;
class RepositoryBoard {
    /**
     * Constructor that creates instances of the class RepositoryBoard
     * @returns empty array
     */
    constructor() {
        this.arrayBoard = [];
    }
    /**
     * Get object Board by ID from Repository
     * @param id - object Board ID in uuid format
     * @returns object Board or error message
     */
    findById(id) {
        const index = this.receiveId(id);
        if (index === ITEM_NOT_FOUND) {
            return 'id not found';
        }
        return this.arrayBoard[index];
    }
    /**
     * Get all objects Board from Repository
     * @returns all objects Board from Repository
     */
    findAll() {
        return this.arrayBoard;
    }
    /**
     * Create new object Board in Repository
     * @param board - the Board object received from the user
     * @returns board object created in the Repository
     */
    createBoard(board) {
        const createBoard = new board_model_1.Board(board);
        this.arrayBoard.push(createBoard);
        return createBoard;
    }
    /**
     * Modifying the Board object while keeping the original ID
     * @param id - the id of the Board object to be modified
     * @param board - Board object with new data
     * @returns a Board object saved in the Repository after a change or an error message
     */
    editBoard(id, board) {
        const index = this.receiveId(id);
        if (index === ITEM_NOT_FOUND) {
            return "id isn'not valid";
        }
        const boardDb = this.arrayBoard[index];
        boardDb.columns = board.columns;
        boardDb.title = board.title;
        this.arrayBoard[index] = boardDb;
        return boardDb;
    }
    /**
     * Removing a Board object by ID from the Repository
     * @param id - D of the Board object to remove
     * @returns true on success, on error - an error message
     */
    deleteBoard(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = yield this.receiveId(id);
            if (index === ITEM_NOT_FOUND) {
                return 'id not found';
            }
            yield this.arrayBoard.splice(index, 1);
            return true;
        });
    }
    /**
     * Searching the Repository for an object with a given ID
     * @param id - Object ID to search
     * @returns index of the object with the given ID in the Repository array, or -1 if it is absent
     */
    receiveId(id) {
        const index = this.arrayBoard.findIndex((board) => board.id === id);
        return index;
    }
}
module.exports = new RepositoryBoard();
