const fastify = require('fastify')({ logger: true });
const swaggerUI = require('fastify-swagger');
const path = require('path');

fastify.register(swaggerUI, {
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml'),
  },
  exposeRoute: true,
  routePrefix: '/doc',
});

fastify.register(require('./resources/users/user.router'), {
  prefix: '/users',
});
fastify.register(require('./resources/boards/board.router'), {
  prefix: '/boards',
});
fastify.register(require('./resources/tasks/task.router'), {
  prefix: '/boards/:boardId/tasks',
});

module.exports = fastify;
