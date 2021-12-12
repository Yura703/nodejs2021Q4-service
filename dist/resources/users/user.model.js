"use strict";
var uuid_1 = require("uuid");
var User = /** @class */ (function () {
    function User(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.id, id = _c === void 0 ? (0, uuid_1.v4)() : _c, _d = _b.name, name = _d === void 0 ? 'USER' : _d, _e = _b.login, login = _e === void 0 ? 'user' : _e, _f = _b.password, password = _f === void 0 ? 'P@55w0rd' : _f;
        this.id = id;
        this.name = name;
        this.login = login;
        this.password = password;
    }
    return User;
}());
module.exports = User;
