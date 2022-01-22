import dotenv from 'dotenv';
import path from 'path';
import pino from 'pino';
import { LoggerLevel } from './log-level';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

// export default {
//   PORT: process.env.PORT,
//   LEVEL_LOG: LoggerLevel[process.env.LEVEL_LOG ? +process.env.LEVEL_LOG : 3] as pino.LevelWithSilent,
//   NODE_ENV: process.env.NODE_ENV,
//   MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
//   JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
//   AUTH_MODE: process.env.AUTH_MODE === 'true'
// };

const {
  PORT,
  NODE_ENV,
  JWT_SECRET_KEY,
  AUTH_MODE,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST,
  SALT
} = process.env;

const LEVEL_LOG = LoggerLevel[process.env.LEVEL_LOG ? +process.env.LEVEL_LOG : 3] as pino.LevelWithSilent

export const CONFIG = {
  PORT,
  NODE_ENV,
  JWT_SECRET_KEY,
  AUTH_MODE: AUTH_MODE === 'true',
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST,
  LEVEL_LOG, 
  SALT
};
