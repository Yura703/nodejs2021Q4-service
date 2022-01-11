import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./resources/models/user.model";

createConnection({
    type: "postgres",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin",
    database: "test",
    entities: [
        User
    ],
    synchronize: true,
    logging: false
}).then(connection => {
    // here you can start to work with your entities
}).catch(error => console.log(error));