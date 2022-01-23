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
        reply.send();
     }
     const tockenJWT = await getNewJWT(user as User); 
     
     reply.status(200);
     reply.send({ tockenJWT });
    });
}

export = loginRoutes;