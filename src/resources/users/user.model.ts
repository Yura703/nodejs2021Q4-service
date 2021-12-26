import { v4 as uuidv4 } from 'uuid';

interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

export class User implements IUser {
  /**
   * Constructor forming an object of the User class
   * @param name - the user name
   * @param login - the user login
   * @param password - the user password
   * @returns object of the User class 
   */
  constructor({ name = 'USER', login = 'user', password = 'P@55w0rd' } = {}) {
    this.id = uuidv4();
    this.name = name;
    this.login = login;
    this.password = password;
  }

  id: string;

  name: string;

  login: string;

  password: string;
}

export type UserDto = Omit<IUser, 'password'>;
