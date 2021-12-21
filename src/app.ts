import fastify from 'fastify';
import swaggerUI from 'fastify-swagger';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import  config  from './common/config';

const server =  fastify({ 
  logger: {
    level: config.LEVEL_LOG,
    file: './../logs/log.log',
    serializers: {
      res(reply) {
        return {
          statusCode: reply.statusCode
        }
      },
      req(request) {
        return {
          method: request.method,
          url: request.url,
          parameters: request.params,
        }
      }
    }
  } 
});

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
