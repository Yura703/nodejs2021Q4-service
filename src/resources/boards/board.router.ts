import { FastifyPluginAsync } from "fastify"
import boardsService from './board.service';
import { postBoardOpts, putBoardOpts } from './board.schema';
import { Board } from "./board.model";

const boardRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
  
  /**
   * GET router no parameters
   * @returns send  all objects Board and status code
   */
  fastify.get('/', async (_req, reply) => {
    const boards = await boardsService.findAll();

    reply.send(boards);
  });

  /**
    * GET router with parameters
    * @param params - boardId
    * @returns send objects Board by ID from Repository and status code
   */
  fastify.get<{ Params: {boardId: string} }>('/:boardId', async (req, reply) => {
    const { boardId } = req.params;
    const board = await boardsService.findById(boardId);

    if (typeof board === 'string') {
      reply.status(404);
    }
    reply.send(board);
  });

  /**
  * POST router - Create new object Board in Repository 
  * @param body - the Board object received from the user
  * @returns send board object created in the Repository and status code
 */
  fastify.post<{ Body: Board }>('/', postBoardOpts, async (req, reply) => {
    const boardReq = req.body;
    const board = await boardsService.createBoard(boardReq);

    reply.status(201);
    reply.send(board);
  });

  /**
    * Put router - Modifying the Board object while keeping the original ID
    * @param params - the id of the Board object to be modified
    * @param body - Board object with new data
    * @returns a Board object saved in the Repository after a change or an error message and status code
 */
  fastify.put<{ Params: {boardId: string}, Body: Board }>('/:boardId', putBoardOpts, async (req, reply) => {
    const { boardId } = req.params;
    const boardReq = req.body;
    const board = await boardsService.editBoard(boardId, boardReq);

    reply.send(board);
  });

  /**
    * DELETE router - Removing a Board object by ID from the Repository
    * @param params - ID of the Board object to remove 
    * @returns status code on success, error message and status code on error
 */
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
