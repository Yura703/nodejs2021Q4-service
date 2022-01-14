import "reflect-metadata";
import { createConnection } from "typeorm";
import connectionOptions from "./ormconfig";

export const connect = createConnection(connectionOptions)
.then(() => {
    console.log('Connected DB');    
})
.catch(error => console.log(error));