const boardsService = require('./board.service');
// const schemas = require('./board.schema');

async function boardRoutes(fastify) {
  // GET /boards - get all boards
  fastify.get('/', async (req, reply) => {
    const boards = await boardsService.findAll();

    reply.send(boards);
  });

  // GET /boards/:boardId - get the board by id
  fastify.get('/:boardId', async (req, reply) => {
    const { boardId } = req.params;
    const board = await boardsService.findById(boardId);

    reply.send(board);
  });

  // POST /boards - create board
  fastify.post('/', async (req, reply) => {
    const boardReq = req.body;
    const board = await boardsService.createboard(boardReq);

    reply.status(201);
    reply.send(board.toResponse(board));
  });

  // PUT /boards/:boardId - update board
  fastify.put('/:boardId', async (req, reply) => {
    const { boardId } = req.params;
    const boardReq = req.body;
    const board = await boardsService.editboard(boardId, boardReq);

    reply.send(board);
  });

  // DELETE /boards/:boardId - delete board
  fastify.delete('/:boardId', async (req, reply) => {
    const { boardId } = req.params;
    const result = await boardsService.deleteboard(boardId);
    if (typeof result === 'string') {
      reply.status(404);
      reply.send(result);
    }
    reply.status(204);
    reply.send();
  });
}

module.exports = boardRoutes;
