import User from './user.model';

const ITEM_NOT_FOUND = -1;

class RepositoryUser {
  arrayUser: User[];
  constructor() {
    this.arrayUser = [];
  }

  // get
  findById(id: string): User | string {
    const index = this.receiveId(id);
    if (index === ITEM_NOT_FOUND) {
      return "id isn'not valid";
    }

    return this.arrayUser[index];
  }

  findAll(): User[] {
    return this.arrayUser;
  }

  // post
  createUser(user: User): User {
    const createUser = new User(user);
    this.arrayUser.push(createUser);

    return createUser;
  }

  // put
  editUser(id: string, user: User): User | string {
    const index = this.receiveId(id);
    if (index === ITEM_NOT_FOUND) {
      return "id isn'not valid";
    }
    const createUser = new User(user);
    createUser.id = id;
    this.arrayUser[index] = createUser;

    return createUser;
  }

  // delete
  async deleteUser(id: string): Promise<string | true> {
    const index = this.receiveId(id);
    if (index === ITEM_NOT_FOUND) {
      return "id isn'not valid";
    }

    this.arrayUser.splice(index, 1);

    return true;
  }

  receiveId(id: string): number {
    const index = this.arrayUser.findIndex((user) => user.id === id);

    return index;
  }
}

export = new RepositoryUser();
