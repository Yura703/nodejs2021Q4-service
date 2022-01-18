import  { CONFIG } from './common/config';
import fastify from './app';
//import connect from './appDb';
import "reflect-metadata";
// import { createConnection } from "typeorm";
// import connectionOptions from "./ormconfig";

const PORT =  CONFIG.PORT ?? 4000;

/**
 * Start Server or will be error.
 * @returns Promise<void>
 */
const start = async () => {
  try {
   
    fastify.listen(PORT, "0.0.0.0", () => {
      console.log(`Server listenen on ${PORT} port`);
      
    });

    // await createConnection(connectionOptions)
    //   .then(() => {
    //       console.log('Connected DB');
          
    //   })
    //   .catch(error => console.log(error));

  } catch (error) {
    fastify.log.error(error);
    throw new Error("Ops");
    // process.exit(1);
  }
};

start();



