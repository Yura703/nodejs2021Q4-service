const findAll = {
  schema: {
    response: {
      200: {
        type: 'array',
        user: {
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

const getUsersOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        users: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
          },
        },
      },
    },
  },
};

module.exports = { findAll, getUsersOpts };
