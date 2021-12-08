import { FastifyPluginAsync } from "fastify"
import boardsService from './board.service';
import { postBoardOpts, putBoardOpts } from './board.schema';
import { Board } from "./board.model";

const boardRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
  // GET /boards - get all boards
  fastify.get('/', async (req, reply) => {
    const boards = await boardsService.findAll();

    reply.send(boards);
  });

  // GET /boards/:boardId - get the board by id
  fastify.get<{ Params: {boardId: string} }>('/:boardId', async (req, reply) => {
    const { boardId } = req.params;
    const board = await boardsService.findById(boardId);

    if (typeof board === 'string') {
      reply.status(404);
    }
    reply.send(board);
  });

  // POST /boards - create board
  fastify.post<{ Body: Board }>('/', postBoardOpts, async (req, reply) => {
    const boardReq = req.body;
    const board = await boardsService.createBoard(boardReq);

    reply.status(201);
    reply.send(board);
  });

  // PUT /boards/:boardId - update board
  fastify.put<{ Params: {boardId: string}, Body: Board }>('/:boardId', putBoardOpts, async (req, reply) => {
    // сделать замену для данных колонки
    const { boardId } = req.params;
    const boardReq = req.body;
    const board = await boardsService.editBoard(boardId, boardReq);

    reply.send(board);
  });

  // DELETE /boards/:boardId - delete board
  fastify.delete<{ Params: {boardId: string} }>('/:boardId', async (req, reply) => {
    const { boardId } = req.params;
    const result = await boardsService.deleteBoard(boardId);
    if (typeof result === 'string') {
      reply.status(404);
      reply.send(result);
    }
    reply.status(204);
    reply.send();
  });
}

export = boardRoutes;
