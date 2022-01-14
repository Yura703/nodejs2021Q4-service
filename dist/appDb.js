"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const ormconfig_1 = __importDefault(require("./ormconfig"));
exports.default = (0, typeorm_1.createConnection)(ormconfig_1.default)
    .then(() => {
    console.log('Connected DB');
})
    .catch(error => console.log(error));
