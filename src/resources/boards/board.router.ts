import { FastifyPluginAsync } from "fastify"
import boardsService from './board.service';
import { postBoardOpts, putBoardOpts } from './board.schema';
import { Board } from "./board.model";

const boardRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {  
 
  fastify.get('/', async (_req, reply) => {
    const boards = await boardsService.findAll();

    reply.code(200);
    reply.send(boards);
  });
  
  fastify.get<{ Params: {boardId: string} }>('/:boardId', async (req, reply) => {
    const { boardId } = req.params;
    const board = await boardsService.findById(boardId);
    
    reply.send(board);
  });
  
  fastify.post<{ Body: Board }>('/', postBoardOpts, async (req, reply) => {
    const boardReq = req.body;
    const board = await boardsService.createBoard(boardReq);

    reply.status(201);
    reply.send(board);
  });
  
  fastify.put<{ Params: {boardId: string}, Body: Board }>('/:boardId', putBoardOpts, async (req, reply) => {
    const { boardId } = req.params;
    const boardReq = req.body;
    const board = await boardsService.editBoard(boardId, boardReq);

    reply.send(board);
  });
  
  fastify.delete<{ Params: {boardId: string} }>('/:boardId', async (req, reply) => {
    const { boardId } = req.params;
    await boardsService.deleteBoard(boardId);
    
    reply.status(204);
    reply.send();
  });
}

export = boardRoutes;
