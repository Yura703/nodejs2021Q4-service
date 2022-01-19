"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const typeorm_1 = require("typeorm");
const board_model_1 = require("../boards/board.model");
const user_model_1 = require("../users/user.model");
let Task = class Task {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Task.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Task.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Task.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Task.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: null,
        nullable: true
    }),
    __metadata("design:type", Object)
], Task.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: null,
        nullable: true
    }),
    __metadata("design:type", Object)
], Task.prototype, "boardId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: null,
        nullable: true
    }),
    __metadata("design:type", Object)
], Task.prototype, "columnId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => board_model_1.Board, (board) => board.tasks, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'boardId' }),
    __metadata("design:type", String)
], Task.prototype, "board", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.User, (user) => user.tasks, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", String)
], Task.prototype, "user", void 0);
Task = __decorate([
    (0, typeorm_1.Entity)({ name: 'tasks' })
], Task);
exports.Task = Task;
