const fastify = require('fastify')({ logger: true });

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
