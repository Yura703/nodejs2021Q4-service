"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fastify_1 = __importDefault(require("fastify"));
const user_router_1 = __importDefault(require("./resources/users/user.router"));
const board_router_1 = __importDefault(require("./resources/boards/board.router"));
const task_router_1 = __importDefault(require("./resources/tasks/task.router"));
const server = (0, fastify_1.default)({ logger: true });
server.register(user_router_1.default, {
    prefix: '/users',
});
server.register(board_router_1.default, {
    prefix: '/boards',
});
server.register(task_router_1.default, {
    prefix: '/boards/:boardId/tasks',
});
module.exports = server;
