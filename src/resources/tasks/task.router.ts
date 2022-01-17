import { FastifyPluginAsync } from "fastify"
import tasksService from './task.service';
import { postTaskOpts } from './task.schema';
import { Task } from "./task.model";
//import { ITaskDto } from "./task.model";

const taskRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
  
  fastify.get<{ Params: {boardId: string} }>('/', async (req) => {
    const { boardId } = req.params;
    
    return tasksService.findAll(boardId);
  });

  fastify.get<{ Params: {boardId: string, taskId: string} }>('/:taskId', async (req, reply) => {
    const { boardId, taskId } = req.params;

    const task = tasksService.findById(boardId, taskId);

    if (typeof task === 'string') {
      reply.status(404);
      reply.send(task);
    }

    reply.send(task);
  });

  fastify.post<{ Params: {boardId: string}, Body: Task }>('/', postTaskOpts, async (req, reply) => {
    const taskReq = req.body;
    const { boardId } = req.params;
    const task = tasksService.createTask(boardId, taskReq);

    reply.status(201);
    reply.send(task);
  });

  fastify.put<{ Params: {boardId: string, taskId: string}, Body: Task }>('/:taskId', postTaskOpts, async (req, reply) => {
    const { boardId, taskId } = req.params;
    const taskReq = req.body;
    const task = tasksService.editTask(boardId, taskId, taskReq);

    reply.send(task);
  });

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
