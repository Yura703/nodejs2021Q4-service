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
const user_service_1 = __importDefault(require("./user.service"));
const user_schema_1 = require("./user.schema");
const userRoutes = (fastify) => __awaiter(void 0, void 0, void 0, function* () {
    fastify.get('/', user_schema_1.getAllUsersOpts, () => __awaiter(void 0, void 0, void 0, function* () { return user_service_1.default.findAll(); }));
    fastify.get('/:userId', user_schema_1.getUsersOpts, (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = req.params;
        const user = user_service_1.default.findById(userId);
        reply.status(200);
        if (!user) {
            reply.status(404);
        }
        return user;
    }));
    fastify.post('/', user_schema_1.postUsersOpts, (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const userReq = req.body;
        reply.status(201);
        return user_service_1.default.createUser(userReq);
    }));
    fastify.put('/:userId', user_schema_1.putUsersOpts, (req) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = req.params;
        const userReq = req.body;
        return user_service_1.default.editUser(userId, userReq);
    }));
    fastify.delete('/:userId', (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = req.params;
        const userDel = yield user_service_1.default.deleteUser(userId);
        reply.status(204);
        if (!userDel) {
            reply.status(404);
        }
        reply.send();
    }));
});
module.exports = userRoutes;
