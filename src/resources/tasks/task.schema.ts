const postTaskOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'order'],
      properties: {
        title: { type: 'string' },
        order: { type: 'number' },
        description: { type: 'string' },
        userId: { type: ['string', 'null'] },
        boardId: { type: 'string' },
        columnId: { type: ['string', 'null'] },
      },
    },
    response: {
      201: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          title: { type: 'string' },
          order: { type: 'number' },
          description: { type: 'string' },
          userId: { type: ['string', 'null'] },
          boardId: { type: 'string' },
          columnId: { type: ['string', 'null'] },
        },
      },
    },
  },
};

module.exports = { postTaskOpts };
