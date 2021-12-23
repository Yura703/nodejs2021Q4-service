import { FastifyReply, FastifyRequest } from "fastify";
import  config  from './common/config';


export const logger = {
    level: config.LEVEL_LOG,
    file: 'log.log',
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
          query: request.query,
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
