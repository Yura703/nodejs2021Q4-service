const Board = require('./board.model');
// const { deleteTaskByBoardId } = require('../tasks/task.service');

const ITEM_NOT_FOUND = -1;

class RepositoryBoard {
  constructor() {
    this.arrayBoard = [];
  }

  // get
  findById(id) {
    const index = this.receiveId(id);
    if (index === ITEM_NOT_FOUND) {
      return 'id not found';
    }

    return this.arrayBoard[index];
  }

  findAll() {
    return this.arrayBoard;
  }

  // post
  createBoard(board) {
    const createBoard = new Board(board);
    this.arrayBoard.push(createBoard);

    return createBoard;
  }

  // put
  editBoard(id, board) {
    const index = this.receiveId(id);
    if (index === ITEM_NOT_FOUND) {
      return "id isn'not valid";
    }

    this.arrayBoard[index].title = board.title; // сделать редактирование  столбцов

    return this.arrayBoard[index];
  }

  // delete
  async deleteBoard(id) {
    const index = await this.receiveId(id);
    if (index === ITEM_NOT_FOUND) {
      return 'id not found';
    }
    // const board = this.arrayBoard[index];
    // await deleteTaskByBoardId(board.id);

    await this.arrayBoard.splice(index, 1);
    return true;
  }

  receiveId(id) {
    const index = this.arrayBoard.findIndex((board) => board.id === id);

    return index;
  }
}

module.exports = new RepositoryBoard();
