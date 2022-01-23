"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("./resources/users/user.model");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const board_model_1 = require("./resources/boards/board.model");
const task_model_1 = require("./resources/tasks/task.model");
dotenv_1.default.config({
    path: path_1.default.join(__dirname, '../../.env')
});
const connectionOptions = {
    //name: 'postg',
    type: 'postgres',
    host: 'postgres',
    port: process.env.POSTGRES_PORT ? +process.env.POSTGRES_PORT : 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    logging: false,
    entities: [user_model_1.User, board_model_1.Board, task_model_1.Task],
    synchronize: false,
    migrations: ['src/migrations/*.ts'],
    // migrationsRun: true,
    // cli: {
    //   migrationsDir: 'src/migrations'
    // }
};
exports.default = connectionOptions;
