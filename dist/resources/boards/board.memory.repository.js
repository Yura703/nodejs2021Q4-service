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
    constructor() {
        this.arrayBoard = [];
    }
    // get
    findById(id) {
        const index = this.receiveId(id);
        if (index === ITEM_NOT_FOUND) {
            return 'id not found';
        }
        return this.arrayBoard[index];
    }
    findAll() {
        return this.arrayBoard;
    }
    // post
    createBoard(board) {
        const createBoard = new board_model_1.Board(board);
        this.arrayBoard.push(createBoard);
        return createBoard;
    }
    // put
    editBoard(id, board) {
        const index = this.receiveId(id);
        if (index === ITEM_NOT_FOUND) {
            return "id isn'not valid";
        }
        const boardDb = this.arrayBoard[index];
        if (board.columns && board.columns.length !== 0) {
            boardDb.columns = RepositoryBoard.editColumn(board.columns, boardDb.columns);
        }
        boardDb.title = board.title;
        this.arrayBoard[index] = boardDb;
        return boardDb;
    }
    // delete
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
    receiveId(id) {
        const index = this.arrayBoard.findIndex((board) => board.id === id);
        return index;
    }
    static editColumn(columnsFromRequest, columnsFromDb) {
        const _columnsFromDb = columnsFromDb;
        return columnsFromRequest;
        // if (!columnsFromDb || columnsFromDb === []) {
        //   return _columnsFromDb;
        // } else {
        //   columnsFromRequest.forEach((column) => {
        //     if (column.id && validate(column.id) && columnsFromDb) {
        //       const index = RepositoryBoard.findIdInColumns(columnsFromDb, column.id);
        //       if (index !== ITEM_NOT_FOUND && _columnsFromDb) {
        //         _columnsFromDb[index] = column;
        //       } else if(_columnsFromDb && _columnsFromDb !== []) {
        //         const _column = column;
        //         _column.id = uuidv4();
        //         _columnsFromDb.push(_column);
        //       }
        //     } else if (_columnsFromDb) {
        //       const _column = column;
        //       _column.id = uuidv4();
        //       _columnsFromDb.push(_column);
        //     }
        //   });
        // }  
    }
    static findIdInColumns(columnsFromDb, id) {
        return columnsFromDb.findIndex((column) => column.id === id);
    }
}
module.exports = new RepositoryBoard();
