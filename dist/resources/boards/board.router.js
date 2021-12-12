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
    /**
     * GET router no parameters
     * @returns send  all objects Board and status code
     */
    fastify.get('/', (_req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const boards = yield board_service_1.default.findAll();
        reply.send(boards);
    }));
    /**
      * GET router with parameters
      * @param params - boardId
      * @returns send objects Board by ID from Repository and status code
     */
    fastify.get('/:boardId', (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { boardId } = req.params;
        const board = yield board_service_1.default.findById(boardId);
        if (typeof board === 'string') {
            reply.status(404);
        }
        reply.send(board);
    }));
    /**
    * Create new object Board in Repository
    * @param body - the Board object received from the user
    * @returns send board object created in the Repository and status code
   */
    fastify.post('/', board_schema_1.postBoardOpts, (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const boardReq = req.body;
        const board = yield board_service_1.default.createBoard(boardReq);
        reply.status(201);
        reply.send(board);
    }));
    /**
      * Modifying the Board object while keeping the original ID
      * @param params - the id of the Board object to be modified
      * @param body - Board object with new data
      * @returns a Board object saved in the Repository after a change or an error message and status code
   */
    fastify.put('/:boardId', board_schema_1.putBoardOpts, (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { boardId } = req.params;
        const boardReq = req.body;
        const board = yield board_service_1.default.editBoard(boardId, boardReq);
        reply.send(board);
    }));
    /**
      * Removing a Board object by ID and tasks from the removed board from the Repository
      * @param params - ID of the Board object to remove
      * @returns true on success, on error - an error message and status code
   */
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
