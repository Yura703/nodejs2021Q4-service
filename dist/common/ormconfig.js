"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const user_model_1 = require("../resources/users/user.model");
const board_model_1 = require("../resources/boards/board.model");
const task_model_1 = require("../resources/tasks/task.model");
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, POSTGRES_HOST } = config_1.CONFIG;
const connectionOptions = {
    type: 'postgres',
    host: POSTGRES_HOST,
    port: POSTGRES_PORT ? +POSTGRES_PORT : 5432,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    logging: false,
    entities: [user_model_1.User, board_model_1.Board, task_model_1.Task],
    synchronize: false,
    dropSchema: false,
    migrations: ['./src/migrations/**/*.ts'],
    migrationsRun: false,
    cli: {
        migrationsDir: 'src/migrations'
    }
};
exports.default = connectionOptions;
