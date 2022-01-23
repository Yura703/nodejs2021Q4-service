import  { CONFIG } from './common/config';
import fastify from './app';
//import connect from './appDb';

// import { createConnection } from "typeorm";
// import connectionOptions from "./ormconfig";
// import { createConnection } from "typeorm";
// import connectionOptions from "./ormconfig";

const PORT =  CONFIG.PORT ?? 4000;

const start = async () => {
  try {
   
    fastify.listen(PORT, "0.0.0.0", () => {
      console.log(`Server listenen on ${PORT} port`);      
    });    
  } catch (error) {
    fastify.log.error(error);
    throw new Error("Ops");
    // process.exit(1);
  }
};

start();




