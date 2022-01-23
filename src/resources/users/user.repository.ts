import { getRepository } from "typeorm";
import { getHash } from "../logins/login.service";
import { User } from "./user.model";
    
const findById = async (ID: string) => {
  const repository = await getRepository(User);

  return repository.findOne(ID);
}
    
const findAll = async () => {
  const repository = await getRepository(User);

  return repository.find();
}

const findByLogin = async (loginUser: string) => {
  const repository = await getRepository(User);

  return repository.findOne({where: {login: loginUser}});
}

const createUser = async (user: Omit<User, 'id'>) => {
  const repository = await getRepository(User);

  const password = await getHash(user.password);
  const newUser = {...user, password};

  return await repository.save(newUser);
}

const editUser = async (id: string, user: User) => {
  const repository = await getRepository(User);
  const editUser = await repository.findOne(id);
  if (!editUser) {

    return false;
  }
  const password = await getHash(user.password);
  const _user = {...editUser, ...user, password};
  await repository.save(_user);

  return _user;
}

const deleteUser = async (id: string) => {
  const repository = await getRepository(User);
  const delUser = await repository.findOne(id);
  if (!delUser) {

    return false;
  }
  await repository.remove(delUser);

  return true;  
}

export default {
  findById,
  findAll,
  createUser,
  editUser,
  deleteUser,
  findByLogin
}