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
const board_service_1 = __importDefault(require("./board.service"));
const board_schema_1 = require("./board.schema");
const boardRoutes = (fastify) => __awaiter(void 0, void 0, void 0, function* () {
    // GET /boards - get all boards
    fastify.get('/', (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const boards = yield board_service_1.default.findAll();
        reply.send(boards);
    }));
    // GET /boards/:boardId - get the board by id
    fastify.get('/:boardId', (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { boardId } = req.params;
        const board = yield board_service_1.default.findById(boardId);
        if (typeof board === 'string') {
            reply.status(404);
        }
        reply.send(board);
    }));
    // POST /boards - create board
    fastify.post('/', board_schema_1.postBoardOpts, (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const boardReq = req.body;
        const board = yield board_service_1.default.createBoard(boardReq);
        reply.status(201);
        reply.send(board);
    }));
    // PUT /boards/:boardId - update board
    fastify.put('/:boardId', board_schema_1.putBoardOpts, (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        // сделать замену для данных колонки
        const { boardId } = req.params;
        const boardReq = req.body;
        const board = yield board_service_1.default.editBoard(boardId, boardReq);
        reply.send(board);
    }));
    // DELETE /boards/:boardId - delete board
    fastify.delete('/:boardId', (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { boardId } = req.params;
        const result = yield board_service_1.default.deleteBoard(boardId);
        if (typeof result === 'string') {
            reply.status(404);
            reply.send(result);
        }
        reply.status(204);
        reply.send();
    }));
});
module.exports = boardRoutes;
