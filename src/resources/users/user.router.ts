import { FastifyPluginAsync } from "fastify"
import usersService from './user.service';
import { getUsersOpts, getAllUsersOpts, postUsersOpts, putUsersOpts } from './user.schema';
import User from "./user.model";

const userRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
  
  /**
   * GET router no parameters
   * @returns send  all objects User and status code
   */
  fastify.get('/', getAllUsersOpts, async () => usersService.findAll());
  
  /**
    * GET router with parameters
    * @param params - userId
    * @returns send objects User by ID from Repository and status code
   */
  fastify.get<{ Params: {userId: string} }>('/:userId', getUsersOpts, async (req) => {
    const { userId } = req.params;

    return usersService.findById(userId);    
  });

  /**
  * POST router - Create new object User in Repository 
  * @param body - the User object received from the user
  * @returns send user object created in the Repository and status code
 */
  fastify.post<{ Body: User }>('/', postUsersOpts, async (req, reply) => {
    const userReq: User = req.body;
    reply.status(201);

    return usersService.createUser(userReq);  
  });

  /**
    * Put router - Modifying the User object while keeping the original ID
    * @param params - the id of the User object to be modified
    * @param body - User object with new data
    * @returns a User object saved in the Repository after a change or an error message and status code
 */
  fastify.put<{ Params: {userId: string}, Body: User }>('/:userId', putUsersOpts, async (req) => {
    const { userId } = req.params;
    const userReq = req.body;
    
    return usersService.editUser(userId, userReq);
  });

  /**
    * DELETE router - Removing a User object by ID from the Repository
    * @param params - ID of the User object to remove 
    * @returns status code on success, error message and status code on error
 */
  fastify.delete<{ Params: {userId: string} }>('/:userId', async (req, reply) => {
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
