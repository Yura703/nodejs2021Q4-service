import fastify from 'fastify';
import swaggerUI from 'fastify-swagger';
// import { pinoLogger } from './logger';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import  config  from './common/config';

const server =  fastify({ 
  disableRequestLogging: true,
  logger: {
    level: config.LEVEL_LOG,
    file: 'log.log',
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
          query: request.query,
          parameters: request.params,
          body: request.body,
        }
      }
    },
    prettyPrint: {
      ignore: 'log,pid,time,hostname,req.headers,reqId,',
      colorize: false,
    },
    // serializers: {
    //   res(reply: FastifyReply) {
    //     return {
    //       statusCode: reply.statusCode,
    //     };
    //   },
    //   req(request: FastifyRequest) {
    //     return {
    //       method: request.method,
    //       url: request.url,
    //       path: request.routerPath,
    //       parameters: request.params,
    //       body: request.body,
    //     };
    //   },
    // },
  },
});

// pinoLogger(app, errorLogFilePath);
  
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

// //const logger = new Logger({ app });

// process.on('uncaughtException', (reason) => {
//   log.error(`CAPTURED ERROR:${reason.message}`);
//   process.exit(1);
// });
// // throw Error('Oops!');

// process.on('unhandledRejection', (reason: Error) => {
//   logger.error(`UNHANDLED REJECTION DETECTED: ${reason.message}`);
//   process.exit(1);
// });

export = server;
