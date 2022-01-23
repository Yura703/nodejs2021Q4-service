import { FastifyReply, FastifyRequest } from "fastify";
// eslint-disable-next-line node/no-missing-import
import queryString from 'query-string';
import { pino, LoggerOptions } from 'pino';
import path from 'path';
import  { CONFIG }  from './common/config';

 
const pinoLogger: LoggerOptions = {
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
  },
  transport: {
    targets: [
      {
        level: CONFIG.LEVEL_LOG,
        target: 'pino/file',
        options: {
          destination: path.resolve(__dirname,'../logs/log.log'),
        },
      },
      {
        level: 'error',
        target: 'pino/file',
        options: {
          destination: path.resolve(__dirname,'../logs/error.log'),
        },
      },
    ],
  }, 
};

export default  pino(pinoLogger);

