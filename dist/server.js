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
const config_1 = __importDefault(require("./common/config"));
const app_1 = __importDefault(require("./app"));
//import createConnection from './appDb';
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const ormconfig_1 = __importDefault(require("./ormconfig"));
const PORT = (_a = config_1.default.PORT) !== null && _a !== void 0 ? _a : 4000;
/**
 * Start Server or will be error.
 * @returns Promise<void>
 */
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield app_1.default.listen(PORT, "0.0.0.0", () => {
            console.log(`Server listenen on ${PORT} port`);
        });
        yield (0, typeorm_1.createConnection)(ormconfig_1.default)
            .then(() => {
            console.log('Connected DB');
        })
            .catch(error => console.log(error));
    }
    catch (error) {
        app_1.default.log.error(error);
        throw new Error("Ops");
        // process.exit(1);
    }
});
start();
