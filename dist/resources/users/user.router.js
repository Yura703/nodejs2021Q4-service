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
    /**
     * GET router no parameters
     * @returns send  all objects User and status code
     */
    fastify.get('/', user_schema_1.getAllUsersOpts, () => __awaiter(void 0, void 0, void 0, function* () { return user_service_1.default.findAll(); }));
    /**
      * GET router with parameters
      * @param params - userId
      * @returns send objects User by ID from Repository and status code
     */
    fastify.get('/:userId', user_schema_1.getUsersOpts, (req) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = req.params;
        return user_service_1.default.findById(userId);
    }));
    /**
    * POST router - Create new object User in Repository
    * @param body - the User object received from the user
    * @returns send user object created in the Repository and status code
   */
    fastify.post('/', user_schema_1.postUsersOpts, (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const userReq = req.body;
        reply.status(201);
        return user_service_1.default.createUser(userReq);
    }));
    /**
      * Put router - Modifying the User object while keeping the original ID
      * @param params - the id of the User object to be modified
      * @param body - User object with new data
      * @returns a User object saved in the Repository after a change or an error message and status code
   */
    fastify.put('/:userId', user_schema_1.putUsersOpts, (req) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = req.params;
        const userReq = req.body;
        return user_service_1.default.editUser(userId, userReq);
    }));
    /**
      * DELETE router - Removing a User object by ID from the Repository
      * @param params - ID of the User object to remove
      * @returns status code on success, error message and status code on error
   */
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
