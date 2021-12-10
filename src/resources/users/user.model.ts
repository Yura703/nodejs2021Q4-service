import { v4 as uuidv4 } from 'uuid';

interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

class User implements IUser {
  constructor({ id = uuidv4(), name = 'USER', login = 'user', password = 'P@55w0rd' } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  id: string;

  name: string;

  login: string;

  password: string;
}

export = User;
