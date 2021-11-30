const User = require('./user.model');
const usersService = require('./user.service');
// const userSchema = require('./user.schema');

async function userRoutes(fastify) {
  // GET /users - get all users (remove password from response)
  fastify.get('/', async (req, reply) => {
    const users = await usersService.findAll();

    reply.send(users === [] ? [] : users.map(User.toResponse));
  });

  // GET /users/:userId - get the user by id (ex. “/users/123”) (remove password from response)
  fastify.get('/:userId', async (req, reply) => {
    const { userId } = req.params;
    const user = await usersService.findById(userId);

    reply.send(user === [] ? [] : User.toResponse(user));
  });

  // POST /users - create user
  fastify.post('/', async (req, reply) => {
    const userReq = req.body;
    const user = await usersService.createUser(userReq);

    reply.send(user);
  });

  // PUT /users/:userId - update user
  fastify.put('/:userId', async (req, reply) => {
    const { userId } = req.params;
    const userReq = req.body;
    const user = await usersService.editUser(userId, userReq);

    reply.send(user);
  });

  // DELETE /users/:userId - delete user
  fastify.delete('/:userId', async (req, reply) => {
    const { userId } = req.params;
    await usersService.deleteUser(userId);

    reply.send();
  });
}

module.exports = userRoutes;
