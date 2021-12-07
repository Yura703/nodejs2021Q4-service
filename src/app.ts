import fastify from 'fastify';
const server =  fastify({ logger: true });
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
// import swaggerUI from 'fastify-swagger';
// import path from 'path';

// server.register(swaggerUI, {
//   mode: 'static',
//   specification: {
//     path: path.join(__dirname, '../doc/api.yaml'),
//   },
//   exposeRoute: true,
//   routePrefix: '/doc',
// });

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
