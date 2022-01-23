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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = exports.getHash = exports.getNewJWT = void 0;
// eslint-disable-next-line node/no-missing-import
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../common/config");
const { JWT_SECRET_KEY, SALT } = config_1.CONFIG;
const routesName = ["users", "boards", "tasks"];
const getNewJWT = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield jsonwebtoken_1.default.sign({ userId: user.id, login: user.login }, JWT_SECRET_KEY || "secret-key", { expiresIn: '6h' });
});
exports.getNewJWT = getNewJWT;
const getHash = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt(parseInt(SALT, 5));
    return yield bcrypt_1.default.hash(password, salt);
});
exports.getHash = getHash;
const checkAuth = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authString = req.headers.authorization;
        let checkUrl = false;
        routesName.forEach(router => {
            const result = req.url.indexOf(router);
            if (result !== -1) {
                checkUrl = true;
            }
        });
        if (authString && checkUrl) {
            const token = authString.split(' ')[1];
            jsonwebtoken_1.default.verify(token, JWT_SECRET_KEY, (error) => {
                if (error) {
                    reply.code(401);
                    reply.send("Token is not valid");
                }
            });
        }
        else if (checkUrl) {
            reply.code(401);
            reply.send("Token is not valid");
        }
    }
    catch (error) {
        reply.code(401);
        reply.send();
    }
});
exports.checkAuth = checkAuth;
