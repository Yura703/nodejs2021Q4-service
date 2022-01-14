"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fastify_1 = __importDefault(require("fastify"));
const fastify_swagger_1 = __importDefault(require("fastify-swagger"));
const user_router_1 = __importDefault(require("./resources/users/user.router"));
const board_router_1 = __importDefault(require("./resources/boards/board.router"));
const task_router_1 = __importDefault(require("./resources/tasks/task.router"));
const logger_1 = __importDefault(require("./logger"));
const server = (0, fastify_1.default)({
    logger: logger_1.default
});
server.addHook('preHandler', (req, _reply, done) => {
    if (req.body) {
        req.log.info({ body: req.body }, 'parsed body');
    }
    done();
});
server.setErrorHandler((error, _request, reply) => {
    reply.status(error.statusCode || 500).send(error);
});
server.register(fastify_swagger_1.default, {
    exposeRoute: true,
    routePrefix: '/doc',
    swagger: {
        info: {
            title: 'nodejs2021Q4-service',
            description: `Let's try to create a competitor for Trello!`,
            version: '1.0.0',
        },
    },
});
server.register(user_router_1.default, {
    prefix: '/users',
});
server.register(board_router_1.default, {
    prefix: '/boards',
});
server.register(task_router_1.default, {
    prefix: '/boards/:boardId/tasks',
});
process.on('uncaughtException', (error) => {
    console.error(error.message);
    throw new Error("Ops");
    // process.exit(1);
});
// throw Error('Oops!')
process.on('unhandledRejection', (error) => {
    console.error(error.message);
    throw new Error("Ops");
    // process.exit(1);
});
module.exports = server;
