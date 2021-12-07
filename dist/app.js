"use strict";
//import fastify from 'fastify'
//const server = fastify({ logger: true });
const server = require('fastify')({ logger: true });
const swaggerUI = require('fastify-swagger');
const path = require('path');
server.register(swaggerUI, {
    mode: 'static',
    specification: {
        path: path.join(__dirname, '../doc/api.yaml'),
    },
    exposeRoute: true,
    routePrefix: '/doc',
});
server.register(require('./resources/users/user.router'), {
    prefix: '/users',
});
server.register(require('./resources/boards/board.router'), {
    prefix: '/boards',
});
server.register(require('./resources/tasks/task.router'), {
    prefix: '/boards/:boardId/tasks',
});
module.exports = server;
