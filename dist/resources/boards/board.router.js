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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var board_service_1 = __importDefault(require("./board.service"));
var board_schema_1 = require("./board.schema");
var boardRoutes = function (fastify) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        /**
         * GET router no parameters
         * @returns send  all objects Board and status code
         */
        fastify.get('/', function (_req, reply) { return __awaiter(void 0, void 0, void 0, function () {
            var boards;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, board_service_1.default.findAll()];
                    case 1:
                        boards = _a.sent();
                        reply.send(boards);
                        return [2 /*return*/];
                }
            });
        }); });
        /**
          * GET router with parameters
          * @param params - boardId
          * @returns send objects Board by ID from Repository and status code
         */
        fastify.get('/:boardId', function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
            var boardId, board;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        boardId = req.params.boardId;
                        return [4 /*yield*/, board_service_1.default.findById(boardId)];
                    case 1:
                        board = _a.sent();
                        if (typeof board === 'string') {
                            reply.status(404);
                        }
                        reply.send(board);
                        return [2 /*return*/];
                }
            });
        }); });
        /**
        * POST router - Create new object Board in Repository
        * @param body - the Board object received from the user
        * @returns send board object created in the Repository and status code
       */
        fastify.post('/', board_schema_1.postBoardOpts, function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
            var boardReq, board;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        boardReq = req.body;
                        return [4 /*yield*/, board_service_1.default.createBoard(boardReq)];
                    case 1:
                        board = _a.sent();
                        reply.status(201);
                        reply.send(board);
                        return [2 /*return*/];
                }
            });
        }); });
        /**
          * Put router - Modifying the Board object while keeping the original ID
          * @param params - the id of the Board object to be modified
          * @param body - Board object with new data
          * @returns a Board object saved in the Repository after a change or an error message and status code
       */
        fastify.put('/:boardId', board_schema_1.putBoardOpts, function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
            var boardId, boardReq, board;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        boardId = req.params.boardId;
                        boardReq = req.body;
                        return [4 /*yield*/, board_service_1.default.editBoard(boardId, boardReq)];
                    case 1:
                        board = _a.sent();
                        reply.send(board);
                        return [2 /*return*/];
                }
            });
        }); });
        /**
          * DELETE router - Removing a Board object by ID from the Repository
          * @param params - ID of the Board object to remove
          * @returns status code on success, error message and status code on error
       */
        fastify.delete('/:boardId', function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
            var boardId, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        boardId = req.params.boardId;
                        return [4 /*yield*/, board_service_1.default.deleteBoard(boardId)];
                    case 1:
                        result = _a.sent();
                        if (typeof result === 'string') {
                            reply.status(404);
                            reply.send(result);
                        }
                        reply.status(204);
                        reply.send();
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
module.exports = boardRoutes;
