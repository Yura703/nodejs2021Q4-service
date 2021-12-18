import fastify from 'fastify';
import swaggerUI from 'fastify-swagger';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';

const server =  fastify({ logger: true });

server.register(swaggerUI, {
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

server.register(userRouter, {
  prefix: '/users',
});
server.register(boardRouter, {
  prefix: '/boards',
});
server.register(taskRouter, {
  prefix: '/boards/:boardId/tasks',
});

export = server;
