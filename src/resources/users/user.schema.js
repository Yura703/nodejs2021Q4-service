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

module.exports = { getUsersOpts };
