const User = require('./user.model');

const ITEM_NOT_FOUND = -1;

class RepositoryUser {
  constructor() {
    this.arrayUser = [];
  }

  // get
  findById(id) {
    const index = this.receiveId(id);
    if (index === ITEM_NOT_FOUND) {
      return "id isn'not valid";
    }

    return this.arrayUser[index];
  }

  findAll() {
    return this.arrayUser;
  }

  // post
  createUser(user) {
    const createUser = new User(user);
    this.arrayUser.push(createUser);

    return createUser;
  }

  // put
  editUser(id, user) {
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
  async deleteUser(id) {
    const index = this.receiveId(id);
    if (index === ITEM_NOT_FOUND) {
      return "id isn'not valid";
    }

    // await updateTaskByUserId(id);

    this.arrayUser.splice(index, 1);
    return true;
  }

  receiveId(id) {
    const index = this.arrayUser.findIndex((user) => user.id === id);

    return index;
  }
}

module.exports = new RepositoryUser();
