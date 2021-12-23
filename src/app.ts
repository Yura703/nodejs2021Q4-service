import fastify from 'fastify';
import swaggerUI from 'fastify-swagger';
// import pino from 'pino';
// import loggerPino from './logger';
// import winston from 'winston';
// eslint-disable-next-line node/no-missing-import
// import morgan from 'morgan';
// import middie from 'middie';
// import fastifyExpress from  "fastify-express";
import middie from 'middie';
// eslint-disable-next-line node/no-missing-import
import morgan from 'morgan';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
// import  config  from './common/config';

// logger: logger as unknown as FastifyLoggerInstance,++++++++++++++++++++++++++++++++
const server =  fastify({ logger: false });
  // logger: false
// {
//     level: config.LEVEL_LOG,
//     file: 'log.log',
//     serializers: {
//       res(reply) {
//         return {
//           statusCode: reply.statusCode
//         }
//       },
//       req(request) {
//         return {
//           method: request.method,
//           url: request.url,
//           query: request.query,
//           parameters: request.params,
//           body: request.body,
//         }
//       }
//     }
//   } 
//    }
// );

// server.addHook('preHandler', (req, _reply, done) => {
//   if (req.body) {
//     req.log.info({ body: req.body }, 'parsed body')
//   }
//   done()
// })

// server.register(fastifyExpress)
server.register(middie);
// // fastify.use(require('cors')())
server.use(morgan('dev'));


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

// server.register(morgan('dev'));

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
