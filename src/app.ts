import fastify from 'fastify';
import swaggerUI from 'fastify-swagger';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import logger from './logger';

const server =  fastify({ 
  logger 
});
  
server.addHook('preHandler', (req, _reply, done) => {
  if (req.body) {
    req.log.info({ body: req.body }, 'parsed body')
  }
  done()
})

server.setErrorHandler((error, _request, reply) => {
reply.status(error.statusCode || 500).send(error);
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

process.on('uncaughtException', (error) => {
    console.error(error.message);
    process.exit(1);
  });

   // throw Error('Oops!')

process.on('unhandledRejection', (error: Error) => {
    console.error( error.message);
    process.exit(1);
  });

  // Promise.reject(Error('Oops!'));

export = server;
