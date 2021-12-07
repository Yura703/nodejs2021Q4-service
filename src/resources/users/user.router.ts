import usersService from './user.service';
import { getUsersOpts, getAllUsersOpts, postUsersOpts, putUsersOpts } from './user.schema';

/**
 * Returns the sum of a and b
 * @param a first term number
 * @param b second term number
 * @returns Sum of a and b number
 */
async function userRoutes(fastify) {
  // GET /users - get all users (remove password from response)
  fastify.get('/', getAllUsersOpts, async (req, reply) => {
    const users = await usersService.findAll();

    reply.send(users);
  });

  /**
   *
   */
  // GET /users/:userId - get the user by id (ex. “/users/123”) (remove password from response)
  fastify.get('/:userId', getUsersOpts, async (req, reply) => {
    const { userId } = req.params;
    const user = await usersService.findById(userId);

    reply.send(user);
  });

  // POST /users - create user
  fastify.post('/', postUsersOpts, async (req, reply) => {
    const userReq = req.body;
    const user = await usersService.createUser(userReq);

    reply.status(201);
    reply.send(user);
  });

  // PUT /users/:userId - update user
  fastify.put('/:userId', putUsersOpts, async (req, reply) => {
    const { userId } = req.params;
    const userReq = req.body;
    const user = await usersService.editUser(userId, userReq);

    reply.send(user);
  });

  // DELETE /users/:userId - delete user
  fastify.delete('/:userId', async (req, reply) => {
    const { userId } = req.params;
    const result = await usersService.deleteUser(userId);
    if (typeof result === 'string') {
      reply.status(404);
      reply.send(result);
    }
    reply.status(204);
    reply.send();
  });
}

export = userRoutes;
