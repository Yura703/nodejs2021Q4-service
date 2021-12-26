import { FastifyReply, FastifyRequest } from "fastify";
// eslint-disable-next-line node/no-missing-import
import queryString from 'query-string';
import { pino } from 'pino';
import path from 'path';
import  config  from './common/config';
 
const transport = pino.transport({
  targets: [
    {
      target: 'pino/file',
      level: 'error',
      options: {
        description: './logs/error.txt', mkdir: true
      }
    },
    {
      target: 'pino/file',
      level: 'trace',
      options: {
        description: './logs/all.txt', mkdir: true
      }
    }
  ]
});

export const pinoLogger = pino(transport);




export const logger = {
    level: config.LEVEL_LOG,
    file: path.resolve(__dirname,'../logs/log.log'),
    serializers: {
      res(reply: FastifyReply) {
        return {
          statusCode: reply.statusCode
        }
      },
      req(request: FastifyRequest) {
        return {
          method: request.method,
          url: request.url,
          query: queryString.parse(request.url.slice(request.url.indexOf('?') + 1)),
          parameters: request.params,
          body: request.body,
        }
      }
    }
  } 

// const transport = pino.transport({
//     targets: [
// //         {
// //             level: 'info',
// //             target: 'pino/file',
// //   options: { destination: '/log.log', mkdir: true, append: true }
// //         }, 
//         {
//             level: 'info',
//             target: path.resolve(__dirname,'../log.log'),
//             options: {
//             }
//         }
//     ]
// });

// export default pino(transport);
