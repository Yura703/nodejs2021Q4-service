"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line node/no-missing-import
const query_string_1 = __importDefault(require("query-string"));
const pino_1 = require("pino");
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("./common/config"));
const pinoLogger = {
    serializers: {
        res(reply) {
            return {
                statusCode: reply.statusCode
            };
        },
        req(request) {
            return {
                method: request.method,
                url: request.url,
                query: query_string_1.default.parse(request.url.slice(request.url.indexOf('?') + 1)),
                parameters: request.params,
                body: request.body,
            };
        }
    },
    transport: {
        targets: [
            {
                level: config_1.default.LEVEL_LOG,
                target: 'pino/file',
                options: {
                    destination: path_1.default.resolve(__dirname, '../logs/log.log'),
                },
            },
            {
                level: 'error',
                target: 'pino/file',
                options: {
                    destination: path_1.default.resolve(__dirname, '../logs/error.log'),
                },
            },
        ],
    },
};
exports.default = (0, pino_1.pino)(pinoLogger);
