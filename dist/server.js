"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./common/config");
const app_1 = __importDefault(require("./app"));
//import connect from './appDb';
// import { createConnection } from "typeorm";
// import connectionOptions from "./ormconfig";
// import { createConnection } from "typeorm";
// import connectionOptions from "./ormconfig";
const PORT = (_a = config_1.CONFIG.PORT) !== null && _a !== void 0 ? _a : 4000;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        app_1.default.listen(PORT, "0.0.0.0", () => {
            console.log(`Server listenen on ${PORT} port`);
        });
    }
    catch (error) {
        app_1.default.log.error(error);
        throw new Error("Ops");
        // process.exit(1);
    }
});
start();
