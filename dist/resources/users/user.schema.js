"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putUsersOpts = exports.postUsersOpts = exports.getAllUsersOpts = exports.getUsersOpts = void 0;
const getUsersOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    id: { type: 'string', format: 'uuid' },
                    name: { type: 'string' },
                    login: { type: 'string' },
                },
            },
        },
    },
};
exports.getUsersOpts = getUsersOpts;
const getAllUsersOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', format: 'uuid' },
                        name: { type: 'string' },
                        login: { type: 'string' },
                    },
                },
            },
        },
    },
};
exports.getAllUsersOpts = getAllUsersOpts;
const postUsersOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['name', 'login', 'password'],
            properties: {
                name: { type: 'string' },
                login: { type: 'string' },
                password: { type: 'string' },
            },
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    id: { type: 'string', format: 'uuid' },
                    name: { type: 'string' },
                    login: { type: 'string' },
                },
            },
        },
    },
};
exports.postUsersOpts = postUsersOpts;
const putUsersOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                login: { type: 'string' },
                password: { type: 'string' },
            },
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    id: { type: 'string', format: 'uuid' },
                    name: { type: 'string' },
                    login: { type: 'string' },
                },
            },
        },
    },
};
exports.putUsersOpts = putUsersOpts;
