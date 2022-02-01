import * as bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

const { JWT_SECRET_KEY, SALT } = process.env;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const password = await this.getHash(createUserDto.password);
    const newUser = { ...createUserDto, password };
    const userRespons = await this.userRepository.save(newUser);
    delete userRespons.password;
    return userRespons;
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const editUser = await this.userRepository.findOne(id);
    if (!editUser) {
      return false;
    }
    const password = await this.getHash(updateUserDto.password);
    const _user = { ...editUser, ...updateUserDto, password };
    await this.userRepository.save(_user);

    return _user;
  }

  async remove(id: string) {
    const delUser = await this.userRepository.findOne(id);
    if (!delUser) {
      return false;
    }
    return this.userRepository.remove(delUser);
  }

  findByLogin(loginUser: string) {
    return this.userRepository.findOne({ where: { login: loginUser } });
  }

  async getNewJWT(user: User) {
    return await jsonwebtoken.sign(
      { userId: user.id, login: user.login },
      JWT_SECRET_KEY || 'secret-key',
      { expiresIn: '6h' },
    );
  }

  async getHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(+SALT);

    const hashPass = await bcrypt.hash(password, salt);
    return hashPass;
  }

  async checkHash(password: string, hash: string): Promise<boolean> {
    const normPass = await bcrypt.compare(password, hash);
    return normPass;
  }

  // async checkAuth(req: FastifyRequest, reply: FastifyReply) {
  //   try {
  //     const authString = req.headers.authorization;
  //     let checkUrl = false;
  //     routesName.forEach((router) => {
  //       const result = req.url.indexOf(router);
  //       if (result !== -1) {
  //         checkUrl = true;
  //       }
  //     });

  //     if (authString && checkUrl) {
  //       const token = authString.split(' ')[1];

  //       jsonwebtoken.verify(token, JWT_SECRET_KEY as string, (error) => {
  //         if (error) {
  //           reply.code(401);
  //           reply.send('Token is not valid');
  //         }
  //       });
  //     } else if (checkUrl) {
  //       reply.code(401);
  //       reply.send('Token is not valid');
  //     }
  //   } catch (error) {
  //     reply.code(401);
  //     reply.send();
  //   }
  // }
}
