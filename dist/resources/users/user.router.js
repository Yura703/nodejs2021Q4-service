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
    // GET /users - get all users (remove password from response)
    fastify.get('/', user_schema_1.getAllUsersOpts, () => __awaiter(void 0, void 0, void 0, function* () { return user_service_1.default.findAll(); }));
    /**
     *
     */
    // GET /users/:userId - get the user by id (ex. “/users/123”) (remove password from response)
    fastify.get('/:userId', user_schema_1.getUsersOpts, (req) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = req.params;
        return user_service_1.default.findById(userId);
    }));
    // POST /users - create user
    fastify.post('/', user_schema_1.postUsersOpts, (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const userReq = req.body;
        reply.status(201);
        return user_service_1.default.createUser(userReq);
    }));
    // PUT /users/:userId - update user
    fastify.put('/:userId', user_schema_1.putUsersOpts, (req) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = req.params;
        const userReq = req.body;
        return user_service_1.default.editUser(userId, userReq);
    }));
    // DELETE /users/:userId - delete user
    fastify.delete('/:userId', (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = req.params;
        const result = yield user_service_1.default.deleteUser(userId);
        if (typeof result === 'string') {
            reply.status(404);
            reply.send(result);
        }
        reply.status(204);
        reply.send();
    }));
});
module.exports = userRoutes;
