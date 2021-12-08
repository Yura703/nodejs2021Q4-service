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
const user_model_1 = __importDefault(require("./user.model"));
const ITEM_NOT_FOUND = -1;
class RepositoryUser {
    constructor() {
        this.arrayUser = [];
    }
    // get
    findById(id) {
        const index = this.receiveId(id);
        if (index === ITEM_NOT_FOUND) {
            return "id isn'not valid";
        }
        return this.arrayUser[index];
    }
    findAll() {
        return this.arrayUser;
    }
    // post
    createUser(user) {
        const createUser = new user_model_1.default(user);
        this.arrayUser.push(createUser);
        return createUser;
    }
    // put
    editUser(id, user) {
        const index = this.receiveId(id);
        if (index === ITEM_NOT_FOUND) {
            return "id isn'not valid";
        }
        const createUser = new user_model_1.default(user);
        createUser.id = id;
        this.arrayUser[index] = createUser;
        return createUser;
    }
    // delete
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.receiveId(id);
            if (index === ITEM_NOT_FOUND) {
                return "id isn'not valid";
            }
            this.arrayUser.splice(index, 1);
            return true;
        });
    }
    receiveId(id) {
        const index = this.arrayUser.findIndex((user) => user.id === id);
        return index;
    }
}
module.exports = new RepositoryUser();
