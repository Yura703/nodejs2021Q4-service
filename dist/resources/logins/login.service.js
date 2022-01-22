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
Object.defineProperty(exports, "__esModule", { value: true });
exports.gethashPassword = exports.getNewJWT = void 0;
// eslint-disable-next-line node/no-missing-import
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../common/config");
const { JWT_SECRET_KEY } = config_1.CONFIG;
// export const createJWTtoken = async (bodyPassword: string, user: User) => {
//     //const isPasswordMatching = await bcrypt.compare(bodyPassword, user.password);
//     if (isPasswordMatching && JWT_SECRET_KEY) {
//       return getNewJWT(user);
//     }
//     return null;
// };
const getNewJWT = (user) => {
    jsonwebtoken_1.default.sign({ userId: user.id, login: user.login }, JWT_SECRET_KEY || "secret-key", { expiresIn: '6h' });
};
exports.getNewJWT = getNewJWT;
const gethashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.hash(password, 10);
});
exports.gethashPassword = gethashPassword;
