import { Board } from './board.model';
import { getRepository } from "typeorm";

export class BoardController {

  private boardRepository = getRepository(Board);

  async findById(id: string) {

    return await this.boardRepository.findOne({id: id});
  }

  async findAll() {
    
    return await this.boardRepository.find();
  }

  async createBoard(board: Board) {

    return await this.boardRepository.save(board);
  }

  async editBoard(id: string, board: Board) {

    return await Board.update(id, board);
  }

  async deleteBoard(id: string) {
    const boardToDelete = await this.boardRepository.findOne(id);
    if(boardToDelete) {
      return await this.boardRepository.remove(boardToDelete);
    }
    return new Error("id is bad");
  } 
}
