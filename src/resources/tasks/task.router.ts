import { FastifyPluginAsync } from "fastify"
import tasksService from './task.service';
import { postTaskOpts } from './task.schema';
import { ITaskDto } from "./task.model";

const taskRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
  
  /**
   * GET router no parameters
   * @param boardId - board ID where the task is located
   * @returns send  all objects Task and status code
   */
  fastify.get<{ Params: {boardId: string} }>('/', async (req) => {
    const { boardId } = req.params;
    
    return tasksService.findAll(boardId);
  });

  /**
    * GET router with parameters   
    * @param boardId - board ID where the task is located
    * @param taskId - task ID
    * @returns send objects Task by ID from Repository and status code
   */
  fastify.get<{ Params: {boardId: string, taskId: string} }>('/:taskId', async (req, reply) => {
    const { boardId, taskId } = req.params;

    const task = tasksService.findById(boardId, taskId);

    if (typeof task === 'string') {
      reply.status(404);
      reply.send(task);
    }

    reply.send(task);
  });

  /**
  * POST router - Create new object Task in Repository 
  * @param boardId - board ID where the task is located
  * @param body - the Task object received from the user
  * @returns send Task object created in the Repository and status code
 */
  fastify.post<{ Params: {boardId: string}, Body: ITaskDto }>('/', postTaskOpts, async (req, reply) => {
    const taskReq = req.body;
    const { boardId } = req.params;
    const task = tasksService.createTask(boardId, taskReq);

    reply.status(201);
    reply.send(task);
  });

  /**
    * PUT router - Modifying the Task object while keeping the original ID
    * @param boardId - board ID where the task is located
    * @param taskId - the id of the Task object to be modified
    * @param body - Task object with new data
    * @returns a Task object saved in the Repository after a change or an error message and status code
 */
  fastify.put<{ Params: {boardId: string, taskId: string}, Body: ITaskDto }>('/:taskId', postTaskOpts, async (req, reply) => {
    const { boardId, taskId } = req.params;
    const taskReq = req.body;
    const task = tasksService.editTask(boardId, taskId, taskReq);

    reply.send(task);
  });

   /**
    * DELETE router - Removing a Task object by ID from the Repository
    * @param boardId - board ID where the task is located
    * @param params - ID of the Task object to remove 
    * @returns status code on success, error message and status code on error
 */
  fastify.delete<{ Params: {boardId: string, taskId: string} }>('/:taskId', async (req, reply) => {
    const { boardId, taskId } = req.params;
    const result = await tasksService.deleteTask(boardId, taskId);

    if (typeof result === 'string') {
      reply.status(404);
      reply.send(result);
    }

    reply.status(204);
    reply.send();
  });
}

export = taskRoutes;
