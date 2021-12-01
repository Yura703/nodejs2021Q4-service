const tasksService = require('./task.service');
// const schemas = require('./task.schema');

async function taskRoutes(fastify) {
  // GET /tasks - get all tasks
  fastify.get('/', async (req, reply) => {
    const tasks = await tasksService.findAll();

    reply.send(tasks);
  });

  // GET /tasks/:taskId - get the task by id
  fastify.get('/:taskId', async (req, reply) => {
    const { taskId } = req.params;
    const task = await tasksService.findById(taskId);

    reply.send(task);
  });

  // POST /tasks - create task
  fastify.post('/', async (req, reply) => {
    const taskReq = req.body;
    const task = await tasksService.createtask(taskReq);

    reply.status(201);
    reply.send(task.toResponse(task));
  });

  // PUT /tasks/:taskId - update task
  fastify.put('/:taskId', async (req, reply) => {
    const { taskId } = req.params;
    const taskReq = req.body;
    const task = await tasksService.edittask(taskId, taskReq);

    reply.send(task);
  });

  // DELETE /tasks/:taskId - delete task
  fastify.delete('/:taskId', async (req, reply) => {
    const { taskId } = req.params;
    const result = await tasksService.deletetask(taskId);
    if (typeof result === 'string') {
      reply.status(404);
      reply.send(result);
    }
    reply.status(204);
    reply.send();
  });
}

module.exports = taskRoutes;
