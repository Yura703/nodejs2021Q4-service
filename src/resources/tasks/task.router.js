const tasksService = require('./task.service');
const { postTaskOpts } = require('./task.schema');

async function taskRoutes(fastify) {
  // GET boards/:boardId/tasks - get all tasks
  fastify.get('/', async (req, reply) => {
    const { boardId } = req.params;
    const tasks = await tasksService.findAll(boardId);

    reply.send(tasks);
  });

  // GET boards/:boardId/tasks/:taskId - get the task by id
  fastify.get('/:taskId', async (req, reply) => {
    const { boardId, taskId } = req.params;

    const task = await tasksService.findById(boardId, taskId);

    if (typeof task === 'string') {
      reply.status(404);
      reply.send(task);
    }

    reply.send(task);
  });

  // POST boards/:boardId/tasks - create task
  fastify.post('/', postTaskOpts, async (req, reply) => {
    const taskReq = req.body;
    const { boardId } = req.params;
    const task = await tasksService.createTask(boardId, taskReq);

    reply.status(201);
    reply.send(task);
  });

  // PUT boards/:boardId/tasks/:taskId - update task
  fastify.put('/:taskId', postTaskOpts, async (req, reply) => {
    const { boardId, taskId } = req.params;
    const taskReq = req.body;
    const task = await tasksService.editTask(boardId, taskId, taskReq);

    reply.send(task);
  });

  // DELETE boards/:boardId/tasks/:taskId - delete task
  fastify.delete('/:taskId', async (req, reply) => {
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

module.exports = taskRoutes;
