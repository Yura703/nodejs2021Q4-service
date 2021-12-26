import  config  from './common/config';
import fastify from './app';
import { exit } from 'process';

const PORT =  config.PORT ?? 4000;

/**
 * Start Server or will be error.
 * @returns Promise<void>
 */
const start = async () => {
  try {
    await fastify.listen(PORT);
  } catch (error) {
    fastify.log.error(error);
    exit(1);
  }
};

start();
