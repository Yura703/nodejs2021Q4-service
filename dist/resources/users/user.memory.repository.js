"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.UserRepository = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    /**
    * Get object User by ID from Repository
    * @param id - user ID in uuid format
    * @returns object User or error message
    */
    findById(ID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.User.findOne({ id: ID });
        });
    }
    /**
     * Get all objects User from Repository
     * @returns array of all objects User from Repository
     */
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.User.find();
        });
    }
    /**
    * Create new object User in Repository
    * @returns user object created in the Repository
    */
    createUser(_user) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = _user;
            return yield user.save();
        });
    }
    /**
     * Modifying the User object while keeping the original ID
     * @param id - the id of the User object to be modified
     * @param user - User object with new data
     * @returns a User object saved in the Repository after a change or an error message
     */
    editUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.User.update(id, user);
        });
    }
    /**
     * Removing a User object by ID from the Repository
     * @param id - ID of the User object to remove
     * @returns true on success, on error - an error message
     */
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.User.delete({ id: id });
        });
    }
};
UserRepository = __decorate([
    (0, typeorm_1.EntityRepository)(user_1.User)
], UserRepository);
exports.UserRepository = UserRepository;
