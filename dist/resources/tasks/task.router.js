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
var task_service_1 = __importDefault(require("./task.service"));
var task_schema_1 = require("./task.schema");
var taskRoutes = function (fastify) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        /**
         * GET router no parameters
         * @param boardId - board ID where the task is located
         * @returns send  all objects Task and status code
         */
        fastify.get('/', function (req) { return __awaiter(void 0, void 0, void 0, function () {
            var boardId;
            return __generator(this, function (_a) {
                boardId = req.params.boardId;
                return [2 /*return*/, task_service_1.default.findAll(boardId)];
            });
        }); });
        /**
          * GET router with parameters
          * @param boardId - board ID where the task is located
          * @param taskId - task ID
          * @returns send objects Task by ID from Repository and status code
         */
        fastify.get('/:taskId', function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, boardId, taskId, task;
            return __generator(this, function (_b) {
                _a = req.params, boardId = _a.boardId, taskId = _a.taskId;
                task = task_service_1.default.findById(boardId, taskId);
                if (typeof task === 'string') {
                    reply.status(404);
                    reply.send(task);
                }
                reply.send(task);
                return [2 /*return*/];
            });
        }); });
        /**
        * POST router - Create new object Task in Repository
        * @param boardId - board ID where the task is located
        * @param body - the Task object received from the user
        * @returns send Task object created in the Repository and status code
       */
        fastify.post('/', task_schema_1.postTaskOpts, function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
            var taskReq, boardId, task;
            return __generator(this, function (_a) {
                taskReq = req.body;
                boardId = req.params.boardId;
                task = task_service_1.default.createTask(boardId, taskReq);
                reply.status(201);
                reply.send(task);
                return [2 /*return*/];
            });
        }); });
        /**
          * PUT router - Modifying the Task object while keeping the original ID
          * @param boardId - board ID where the task is located
          * @param taskId - the id of the Task object to be modified
          * @param body - Task object with new data
          * @returns a Task object saved in the Repository after a change or an error message and status code
       */
        fastify.put('/:taskId', task_schema_1.postTaskOpts, function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, boardId, taskId, taskReq, task;
            return __generator(this, function (_b) {
                _a = req.params, boardId = _a.boardId, taskId = _a.taskId;
                taskReq = req.body;
                task = task_service_1.default.editTask(boardId, taskId, taskReq);
                reply.send(task);
                return [2 /*return*/];
            });
        }); });
        /**
         * DELETE router - Removing a Task object by ID from the Repository
         * @param boardId - board ID where the task is located
         * @param params - ID of the Task object to remove
         * @returns status code on success, error message and status code on error
      */
        fastify.delete('/:taskId', function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, boardId, taskId, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.params, boardId = _a.boardId, taskId = _a.taskId;
                        return [4 /*yield*/, task_service_1.default.deleteTask(boardId, taskId)];
                    case 1:
                        result = _b.sent();
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
module.exports = taskRoutes;
