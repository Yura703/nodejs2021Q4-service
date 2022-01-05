import  config  from './common/config';
import fastify from './app';

const PORT =  config.PORT ?? 4000;

/**
 * Start Server or will be error.
 * @returns Promise<void>
 */
const start = async () => {
  try {
    await fastify.listen(PORT, "0.0.0.0");
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
