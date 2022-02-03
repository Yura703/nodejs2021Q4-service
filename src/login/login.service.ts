import { ForbiddenException, Injectable } from '@nestjs/common';
//import bcrypt from 'bcryptjs';
import * as jsonwebtoken from 'jsonwebtoken';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class LoginService {
  constructor(private readonly usersService: UsersService) {}
  JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByLogin(loginDto.login);
    if (!user) {
      throw new ForbiddenException('login is bad');
    }

    const passwordHash = user.password;
    const comparePasswords = this.usersService.checkHash(
      loginDto.password,
      passwordHash,
    );

    if (!comparePasswords) {
      throw new ForbiddenException('login is bad');
    }
    const tocken = this.getNewJWT(user);

    return { tocken };
  }

  //   const { JWT_SECRET_KEY, SALT } = CONFIG;
  // const routesName = ["users", "boards", "tasks"];

  getNewJWT(user: User) {
    return jsonwebtoken.sign(
      { userId: user.id, login: user.login },
      this.JWT_SECRET_KEY || 'secret-key',
      { expiresIn: '6h' },
    );
  }
}
