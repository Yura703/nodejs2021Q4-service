import { getRepository } from "typeorm";
import { User } from "./User";

export class UserController {

  private userRepository = getRepository(User);
  /**
  * Get object User by ID from Repository 
  * @param id - user ID in uuid format
  * @returns object User or error message
  */
  async findById(ID: string) {

    return await this.userRepository.findOne({id: ID});
  }

  /**
   * Get all objects User from Repository 
   * @returns array of all objects User from Repository 
   */
   async findAll() {
    return await this.userRepository.find();
  }

  /**
  * Create new object User in Repository 
  * @returns user object created in the Repository
  */
   async createUser(user: User) {

    return await this.userRepository.save(user);
  }

  /**
   * Modifying the User object while keeping the original ID
   * @param id - the id of the User object to be modified
   * @param user - User object with new data
   * @returns a User object saved in the Repository after a change or an error message
   */
   async editUser(id: string, user: User) {

    return await User.update(id, user);
  }

  /**
   * Removing a User object by ID from the Repository
   * @param id - ID of the User object to remove 
   * @returns true on success, on error - an error message
   */
  async deleteUser(id: string) {
    const userToDelete = await this.userRepository.findOne(id);
    if(userToDelete) {
      return await this.userRepository.remove(userToDelete);
    }
    return new Error("id is bad");
  }

  // /**
  //  * Searching the Repository for an object with a given ID
  //  * @param id - Object ID to search
  //  * @returns index of the object with the given ID in the Repository array, or -1 if it is absent
  //  */
  //  async receiveId(id: string): number {
  //   const index = this.arrayUser.findIndex((user) => user.id === id);

  //   return index;
  // }


  // async updateName(id: number, fullname: string) {
  //   return this.createQueryBuilder("people")
  //     .update()
  //     .set({ fullname: fullname })
  //     .where("people.id = :id", { id })
  //     .execute();
  // }
}





  



