// eslint-disable-next-line node/no-missing-import
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CONFIG } from '../../common/config';
import { User } from '../users/user.model';

const { JWT_SECRET_KEY, SALT } = CONFIG;

export const getNewJWT = (user: User) => {
    jwt.sign(
        { userId: user.id, login: user.login },
        JWT_SECRET_KEY || "secret-key",
        { expiresIn: '6h' }
    );
}

export const gethashPassword = async (password: string) => {
    return await bcrypt.hash(password, SALT || 10);
}