// eslint-disable-next-line node/no-missing-import
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { FastifyRequest, FastifyReply } from 'fastify';
import { CONFIG } from '../../common/config';
import { User } from '../users/user.model';

const { JWT_SECRET_KEY, SALT } = CONFIG;

export const getNewJWT = async (user: User) => {
    return await jsonwebtoken.sign(
        { userId: user.id, login: user.login },
        JWT_SECRET_KEY || "secret-key",
        { expiresIn: '6h' }
    );
}

export const getHash = async (password: string) => {
    const salt = await bcrypt.genSalt(parseInt(SALT as string, 5));
    return await bcrypt.hash(password, salt);
}

export const checkAuth = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const authString = req.headers.authorization;
    if (authString) {
        const tocken = authString.split(' ')[1];
        jsonwebtoken.verify(tocken, JWT_SECRET_KEY as string)
    }
    } catch (error) {
        reply.code(401);
        reply.send();
    }   
}