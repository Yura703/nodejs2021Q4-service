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
Object.defineProperty(exports, "__esModule", { value: true });
const board_model_1 = require("./board.model");
const typeorm_1 = require("typeorm");
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = yield (0, typeorm_1.getRepository)(board_model_1.Board);
    const board = repository.findOne({ id: id });
    if (!board) {
        return false;
    }
    return board;
});
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const repository = yield (0, typeorm_1.getRepository)(board_model_1.Board);
    return repository.find();
});
const createBoard = (board) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = yield (0, typeorm_1.getRepository)(board_model_1.Board);
    return yield repository.save((board));
});
const editBoard = (id, board) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = yield (0, typeorm_1.getRepository)(board_model_1.Board);
    const editBoard = yield repository.findOne({ id: id });
    if (!editBoard) {
        return false;
    }
    const _board = Object.assign(Object.assign({}, editBoard), board);
    yield repository.save(_board);
    return _board;
});
const deleteBoard = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = yield (0, typeorm_1.getRepository)(board_model_1.Board);
    const delBoard = yield repository.findOne({ id: id });
    if (!delBoard) {
        return false;
    }
    yield repository.remove(delBoard);
    return true;
});
exports.default = {
    findById,
    findAll,
    createBoard,
    editBoard,
    deleteBoard
};
