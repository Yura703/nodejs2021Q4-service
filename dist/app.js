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
const fastify_1 = __importDefault(require("fastify"));
const fastify_swagger_1 = __importDefault(require("fastify-swagger"));
const user_router_1 = __importDefault(require("./resources/users/user.router"));
const board_router_1 = __importDefault(require("./resources/boards/board.router"));
const task_router_1 = __importDefault(require("./resources/tasks/task.router"));
const login_router_1 = __importDefault(require("./resources/logins/login.router"));
const logger_1 = __importDefault(require("./logger"));
const typeorm_1 = require("typeorm");
const ormconfig_1 = __importDefault(require("./ormconfig"));
require("reflect-metadata");
const login_service_1 = require("./resources/logins/login.service");
const server = (0, fastify_1.default)({
    logger: logger_1.default
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, typeorm_1.createConnection)(ormconfig_1.default)
        .then(() => {
        console.log('Connected DB');
    })
        .catch(error => console.log(error));
    process.on('uncaughtException', (error) => {
        console.error(error.message);
        throw new Error("Ops");
        // process.exit(1);
    });
}))();
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
server.register(login_router_1.default, {
    prefix: '/login',
});
server.addHook('preValidation', login_service_1.checkAuth);
// throw Error('Oops!')
process.on('unhandledRejection', (error) => {
    console.error(error.message);
    throw new Error("Ops");
    // process.exit(1);
});
module.exports = server;
