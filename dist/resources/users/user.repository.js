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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_model_1 = require("./user.model");
const findById = (ID) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = yield (0, typeorm_1.getRepository)(user_model_1.User);
    return repository.findOne(ID);
});
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const repository = yield (0, typeorm_1.getRepository)(user_model_1.User);
    return repository.find();
});
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = yield (0, typeorm_1.getRepository)(user_model_1.User);
    return yield repository.save(user);
});
const editUser = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = yield (0, typeorm_1.getRepository)(user_model_1.User);
    const editUser = yield repository.findOne(id);
    if (!editUser) {
        return false;
    }
    const _user = Object.assign(Object.assign({}, editUser), user);
    yield repository.save(_user);
    return _user;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = yield (0, typeorm_1.getRepository)(user_model_1.User);
    const delUser = yield repository.findOne(id);
    if (!delUser) {
        return false;
    }
    yield repository.remove(delUser);
    return true;
});
exports.default = {
    findById,
    findAll,
    createUser,
    editUser,
    deleteUser
};
