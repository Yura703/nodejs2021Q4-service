import { FastifyPluginAsync } from "fastify"
import tasksService from './task.service';
import { postTaskOpts } from './task.schema';
import { Task } from "./task.model";

const taskRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
  
  fastify.get<{ Params: {boardId: string} }>('/', async (req) => {
    const { boardId } = req.params;

    return tasksService.findAll(boardId);
  });

  fastify.get<{ Params: {boardId: string, taskId: string} }>('/:taskId', async (req, reply) => {
    const { boardId, taskId } = req.params;
    const task = await tasksService.findById(boardId, taskId);
    
    reply.status(200);
    if (!task) {
      reply.status(404);
    }

    return task;
  });

  fastify.post<{ Params: {boardId: string}, Body: Task }>('/', postTaskOpts, async (req, reply) => {
    const taskReq = req.body;
    const { boardId } = req.params;
    const task = await tasksService.createTask(boardId, taskReq);
    reply.status(201);
    if (!task) {
      reply.status(402);   
    }
    
    return task;
  });

  fastify.put<{ Params: {boardId: string, taskId: string}, Body: Task }>('/:taskId', postTaskOpts, async (req, reply) => {
    const { boardId, taskId } = req.params;
    const taskReq = req.body;
    const task = await tasksService.editTask(boardId, taskId, taskReq);
    reply.status(200);
    if (!task) {
      reply.status(404);   
    }
    
    return task;
  });

  fastify.delete<{ Params: {boardId: string, taskId: string} }>('/:taskId', async (req, reply) => {
    const { boardId, taskId } = req.params;
    const delTask = await tasksService.deleteTask(boardId, taskId);   
    reply.status(204);
    if (!delTask) {
      reply.status(404);
    }    
   
    reply.send();
  });

}

export = taskRoutes;
