import User from './user.model';

const ITEM_NOT_FOUND = -1;

class RepositoryUser {
  arrayUser: User[];

  /**
   * Constructor that creates instances of the class RepositoryUser
   * @returns empty array
   */
  constructor() {
    this.arrayUser = [];
  }

  /**
  * Get object User by ID from Repository 
  * @param id - user ID in uuid format
  * @returns object User or error message
  */
  findById(id: string): User | string {
    const index = this.receiveId(id);
    if (index === ITEM_NOT_FOUND) {
      return "id isn'not valid";
    }

    return this.arrayUser[index];
  }

  /**
   * Get all objects User from Repository 
   * @returns array of all objects User from Repository 
   */
  findAll(): User[] {
    return this.arrayUser;
  }

  /**
  * Create new object User in Repository 
  * @returns user object created in the Repository
  */
  createUser(user: User): User {
    const createUser = new User(user);
    this.arrayUser.push(createUser);

    return createUser;
  }

  /**
   * Modifying the User object while keeping the original ID
   * @param id - the id of the User object to be modified
   * @param user - User object with new data
   * @returns a User object saved in the Repository after a change or an error message
   */
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

  /**
   * Removing a User object by ID from the Repository
   * @param id - ID of the User object to remove 
   * @returns true on success, on error - an error message
   */
  async deleteUser(id: string): Promise<string | true> {
    const index = this.receiveId(id);
    if (index === ITEM_NOT_FOUND) {
      return "id isn'not valid";
    }

    this.arrayUser.splice(index, 1);

    return true;
  }

  /**
   * Searching the Repository for an object with a given ID
   * @param id - Object ID to search
   * @returns index of the object with the given ID in the Repository array, or -1 if it is absent
   */
  receiveId(id: string): number {
    const index = this.arrayUser.findIndex((user) => user.id === id);

    return index;
  }
}

export = new RepositoryUser();
