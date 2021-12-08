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
const tasksService = require('./task.service');
const { postTaskOpts } = require('./task.schema');
const taskRoutes = (fastify) => __awaiter(void 0, void 0, void 0, function* () {
    // GET boards/:boardId/tasks - get all tasks
    fastify.get('/', (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { boardId } = req.params;
        return yield tasksService.findAll(boardId);
    }));
    // GET boards/:boardId/tasks/:taskId - get the task by id
    fastify.get('/:taskId', (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { boardId, taskId } = req.params;
        const task = yield tasksService.findById(boardId, taskId);
        if (typeof task === 'string') {
            reply.status(404);
            reply.send(task);
        }
        reply.send(task);
    }));
    // POST boards/:boardId/tasks - create task
    fastify.post('/', postTaskOpts, (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const taskReq = req.body;
        const { boardId } = req.params;
        const task = yield tasksService.createTask(boardId, taskReq);
        reply.status(201);
        reply.send(task);
    }));
    // PUT boards/:boardId/tasks/:taskId - update task
    fastify.put('/:taskId', postTaskOpts, (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { boardId, taskId } = req.params;
        const taskReq = req.body;
        const task = yield tasksService.editTask(boardId, taskId, taskReq);
        reply.send(task);
    }));
    // DELETE boards/:boardId/tasks/:taskId - delete task
    fastify.delete('/:taskId', (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { boardId, taskId } = req.params;
        const result = yield tasksService.deleteTask(boardId, taskId);
        if (typeof result === 'string') {
            reply.status(404);
            reply.send(result);
        }
        reply.status(204);
        reply.send();
    }));
});
module.exports = taskRoutes;
