import { FastifyPluginAsync } from "fastify"
import usersService from './user.service';
import { getUsersOpts, getAllUsersOpts, postUsersOpts, putUsersOpts } from './user.schema';
import { User } from "./user.model";

const userRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
  
  fastify.get('/', getAllUsersOpts, async () => usersService.findAll());
  
  fastify.get<{ Params: {userId: string} }>('/:userId', getUsersOpts, async (req, reply) => {
    const { userId } = req.params;
    const user = usersService.findById(userId); 
    reply.status(200);
    if (!user) {
      reply.status(404);
    }
    return  user;  
  });

  fastify.post<{ Body: User }>('/', postUsersOpts, async (req, reply) => {
    const userReq: User = req.body;
    reply.status(201);

    return usersService.createUser(userReq);  
  });

  fastify.put<{ Params: {userId: string}, Body: User }>('/:userId', putUsersOpts, async (req) => {
    const { userId } = req.params;
    const userReq = req.body;
    
    return usersService.editUser(userId, userReq);
  });

  fastify.delete<{ Params: {userId: string} }>('/:userId', async (req, reply) => {
    const { userId } = req.params;
    const userDel = await usersService.deleteUser(userId);
    
    reply.status(204);
    if (!userDel) {
      reply.status(404);
    }  

    reply.send();
  });
}

export = userRoutes;
