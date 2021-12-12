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
var board_model_1 = require("./board.model");
var ITEM_NOT_FOUND = -1;
var RepositoryBoard = /** @class */ (function () {
    /**
     * Constructor that creates instances of the class RepositoryBoard
     * @returns empty array
     */
    function RepositoryBoard() {
        this.arrayBoard = [];
    }
    /**
     * Get object Board by ID from Repository
     * @param id - object Board ID in uuid format
     * @returns object Board or error message
     */
    RepositoryBoard.prototype.findById = function (id) {
        var index = this.receiveId(id);
        if (index === ITEM_NOT_FOUND) {
            return 'id not found';
        }
        return this.arrayBoard[index];
    };
    /**
     * Get all objects Board from Repository
     * @returns all objects Board from Repository
     */
    RepositoryBoard.prototype.findAll = function () {
        return this.arrayBoard;
    };
    /**
     * Create new object Board in Repository
     * @param board - the Board object received from the user
     * @returns board object created in the Repository
     */
    RepositoryBoard.prototype.createBoard = function (board) {
        var createBoard = new board_model_1.Board(board);
        this.arrayBoard.push(createBoard);
        return createBoard;
    };
    /**
     * Modifying the Board object while keeping the original ID
     * @param id - the id of the Board object to be modified
     * @param board - Board object with new data
     * @returns a Board object saved in the Repository after a change or an error message
     */
    RepositoryBoard.prototype.editBoard = function (id, board) {
        var index = this.receiveId(id);
        if (index === ITEM_NOT_FOUND) {
            return "id isn'not valid";
        }
        var boardDb = this.arrayBoard[index];
        boardDb.columns = board.columns;
        boardDb.title = board.title;
        this.arrayBoard[index] = boardDb;
        return boardDb;
    };
    /**
     * Removing a Board object by ID from the Repository
     * @param id - D of the Board object to remove
     * @returns true on success, on error - an error message
     */
    RepositoryBoard.prototype.deleteBoard = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.receiveId(id)];
                    case 1:
                        index = _a.sent();
                        if (index === ITEM_NOT_FOUND) {
                            return [2 /*return*/, 'id not found'];
                        }
                        return [4 /*yield*/, this.arrayBoard.splice(index, 1)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    /**
     * Searching the Repository for an object with a given ID
     * @param id - Object ID to search
     * @returns index of the object with the given ID in the Repository array, or -1 if it is absent
     */
    RepositoryBoard.prototype.receiveId = function (id) {
        var index = this.arrayBoard.findIndex(function (board) { return board.id === id; });
        return index;
    };
    return RepositoryBoard;
}());
module.exports = new RepositoryBoard();
