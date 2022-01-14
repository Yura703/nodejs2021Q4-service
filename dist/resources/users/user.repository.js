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
exports.UserController = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
class UserController {
    constructor() {
        this.userRepository = (0, typeorm_1.getRepository)(User_1.User);
        // /**
        //  * Searching the Repository for an object with a given ID
        //  * @param id - Object ID to search
        //  * @returns index of the object with the given ID in the Repository array, or -1 if it is absent
        //  */
        //  async receiveId(id: string): number {
        //   const index = this.arrayUser.findIndex((user) => user.id === id);
        //   return index;
        // }
        // async updateName(id: number, fullname: string) {
        //   return this.createQueryBuilder("people")
        //     .update()
        //     .set({ fullname: fullname })
        //     .where("people.id = :id", { id })
        //     .execute();
        // }
    }
    /**
    * Get object User by ID from Repository
    * @param id - user ID in uuid format
    * @returns object User or error message
    */
    findById(ID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findOne({ id: ID });
        });
    }
    /**
     * Get all objects User from Repository
     * @returns array of all objects User from Repository
     */
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.find();
        });
    }
    /**
    * Create new object User in Repository
    * @returns user object created in the Repository
    */
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.save(user);
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
            return yield User_1.User.update(id, user);
        });
    }
    /**
     * Removing a User object by ID from the Repository
     * @param id - ID of the User object to remove
     * @returns true on success, on error - an error message
     */
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToDelete = yield this.userRepository.findOne(id);
            if (userToDelete) {
                return yield this.userRepository.remove(userToDelete);
            }
            return new Error("id is bad");
        });
    }
}
exports.UserController = UserController;
