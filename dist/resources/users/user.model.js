"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const uuid_1 = require("uuid");
class User {
    /**
     * Constructor forming an object of the User class
     * @param name - the user name
     * @param login - the user login
     * @param password - the user password
     * @returns object of the User class
     */
    constructor({ name = 'USER', login = 'user', password = 'P@55w0rd' } = {}) {
        this.id = (0, uuid_1.v4)();
        this.name = name;
        this.login = login;
        this.password = password;
    }
}
exports.User = User;
