"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putBoardOpts = exports.postBoardOpts = void 0;
var postBoardOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['title'],
            properties: {
                title: { type: 'string' },
                columns: { type: 'array' },
                items: {
                    type: 'object',
                    properties: {
                        title: { type: 'string' },
                        order: { type: 'number' },
                    },
                },
            },
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    id: { type: 'string', format: 'uuid' },
                    title: { type: 'string' },
                    columns: { type: 'array' },
                    items: {
                        type: 'object',
                        properties: {
                            title: { type: 'string' },
                            order: { type: 'number' },
                            id: { type: 'string', format: 'uuid' },
                        },
                    },
                },
            },
        },
    },
};
exports.postBoardOpts = postBoardOpts;
var putBoardOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['title'],
            properties: {
                title: { type: 'string' },
                columns: { type: 'array' },
                items: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', format: 'uuid' },
                        title: { type: 'string' },
                        order: { type: 'number' },
                    },
                },
            },
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    id: { type: 'string', format: 'uuid' },
                    title: { type: 'string' },
                    columns: { type: 'array' },
                    items: {
                        type: 'object',
                        properties: {
                            title: { type: 'string' },
                            order: { type: 'number' },
                            id: { type: 'string', format: 'uuid' },
                        },
                    },
                },
            },
        },
    },
};
exports.putBoardOpts = putBoardOpts;
