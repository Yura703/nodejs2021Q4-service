import { FastifyPluginAsync } from "fastify"
const tasksService = require('./task.service');
const { postTaskOpts } = require('./task.schema');

const taskRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
  // GET boards/:boardId/tasks - get all tasks
  fastify.get<{ Params: {boardId: string} }>('/', async (req, reply) => {
    const { boardId } = req.params;
    
    return await tasksService.findAll(boardId);
  });

  // GET boards/:boardId/tasks/:taskId - get the task by id
  fastify.get<{ Params: {boardId: string, taskId: string} }>('/:taskId', async (req, reply) => {
    const { boardId, taskId } = req.params;

    const task = await tasksService.findById(boardId, taskId);

    if (typeof task === 'string') {
      reply.status(404);
      reply.send(task);
    }

    reply.send(task);
  });

  // POST boards/:boardId/tasks - create task
  fastify.post<{ Params: {boardId: string} }>('/', postTaskOpts, async (req, reply) => {
    const taskReq = req.body;
    const { boardId } = req.params;
    const task = await tasksService.createTask(boardId, taskReq);

    reply.status(201);
    reply.send(task);
  });

  // PUT boards/:boardId/tasks/:taskId - update task
  fastify.put<{ Params: {boardId: string, taskId: string} }>('/:taskId', postTaskOpts, async (req, reply) => {
    const { boardId, taskId } = req.params;
    const taskReq = req.body;
    const task = await tasksService.editTask(boardId, taskId, taskReq);

    reply.send(task);
  });

  // DELETE boards/:boardId/tasks/:taskId - delete task
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
