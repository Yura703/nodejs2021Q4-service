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
const login_service_1 = require("./login.service");
const user_schema_1 = require("../users/user.schema");
const user_repository_1 = __importDefault(require("../users/user.repository"));
const loginRoutes = (fastify) => __awaiter(void 0, void 0, void 0, function* () {
    fastify.post('/', user_schema_1.postUsersOpts, (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_repository_1.default.findByLogin(req.body.login);
        if (!user) {
            reply.status(403);
            return false;
        }
        return (0, login_service_1.getNewJWT)(user);
    }));
});
module.exports = loginRoutes;
