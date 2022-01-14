"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const log_level_1 = require("./log-level");
dotenv_1.default.config({
    path: path_1.default.join(__dirname, '../../.env')
});
exports.default = {
    PORT: process.env.PORT,
    LEVEL_LOG: log_level_1.LoggerLevel[process.env.LEVEL_LOG ? +process.env.LEVEL_LOG : 3],
    NODE_ENV: process.env.NODE_ENV,
    MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    AUTH_MODE: process.env.AUTH_MODE === 'true'
};
