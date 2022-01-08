const postBoardOpts = {
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

const putBoardOpts = {
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

export { postBoardOpts, putBoardOpts };
