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
const task_service_1 = __importDefault(require("./task.service"));
const task_schema_1 = require("./task.schema");
const taskRoutes = (fastify) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * GET router no parameters
     * @param boardId - board ID where the task is located
     * @returns send  all objects Task and status code
     */
    fastify.get('/', (req) => __awaiter(void 0, void 0, void 0, function* () {
        const { boardId } = req.params;
        return task_service_1.default.findAll(boardId);
    }));
    /**
      * GET router with parameters
      * @param boardId - board ID where the task is located
      * @param taskId - task ID
      * @returns send objects Task by ID from Repository and status code
     */
    fastify.get('/:taskId', (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { boardId, taskId } = req.params;
        const task = task_service_1.default.findById(boardId, taskId);
        if (typeof task === 'string') {
            reply.status(404);
            reply.send(task);
        }
        reply.send(task);
    }));
    /**
    * POST router - Create new object Task in Repository
    * @param boardId - board ID where the task is located
    * @param body - the Task object received from the user
    * @returns send Task object created in the Repository and status code
   */
    fastify.post('/', task_schema_1.postTaskOpts, (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const taskReq = req.body;
        const { boardId } = req.params;
        const task = task_service_1.default.createTask(boardId, taskReq);
        reply.status(201);
        reply.send(task);
    }));
    /**
      * PUT router - Modifying the Task object while keeping the original ID
      * @param boardId - board ID where the task is located
      * @param taskId - the id of the Task object to be modified
      * @param body - Task object with new data
      * @returns a Task object saved in the Repository after a change or an error message and status code
   */
    fastify.put('/:taskId', task_schema_1.postTaskOpts, (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { boardId, taskId } = req.params;
        const taskReq = req.body;
        const task = task_service_1.default.editTask(boardId, taskId, taskReq);
        reply.send(task);
    }));
    /**
     * DELETE router - Removing a Task object by ID from the Repository
     * @param boardId - board ID where the task is located
     * @param params - ID of the Task object to remove
     * @returns status code on success, error message and status code on error
  */
    fastify.delete('/:taskId', (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { boardId, taskId } = req.params;
        const result = yield task_service_1.default.deleteTask(boardId, taskId);
        if (typeof result === 'string') {
            reply.status(404);
            reply.send(result);
        }
        reply.status(204);
        reply.send();
    }));
});
module.exports = taskRoutes;
