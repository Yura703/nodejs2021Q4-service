const fastify = require('fastify')({ logger: true });

fastify.register(require('./resources/users/user.router'), {
  prefix: '/users',
});

module.exports = fastify;
