import { FastifyPluginAsync } from "fastify"
import { getNewJWT } from './login.service';
import { User } from "../users/user.model";
import { postUsersOpts } from "../users/user.schema";
import  userController from '../users/user.repository';

const loginRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
  
    fastify.post<{ Body: User }>('/', postUsersOpts, async (req, reply) => {
      
     const user =  await userController.findByLogin(req.body.login);
     if (!user) {
        reply.status(403);
        return false;
     }

     return getNewJWT(user);    
    });
}

export = loginRoutes;