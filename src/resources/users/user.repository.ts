import { getRepository } from "typeorm";
import { User } from "./user.model";

export class UserController {

  private userRepository = getRepository(User);
  
  async findById(ID: string) {

    return await this.userRepository.findOne({id: ID});
  }
    
  async findAll() {
    
    return await this.userRepository.find();
  }

  async createUser(user: User) {

    return await this.userRepository.save(user);
  }

  async editUser(id: string, user: User) {

    return await User.update(id, user);
  }

  async deleteUser(id: string) {
    const userToDelete = await this.userRepository.findOne(id);
    if(userToDelete) {
      return await this.userRepository.remove(userToDelete);
    }
    return new Error("id is bad");
  }

  




  



