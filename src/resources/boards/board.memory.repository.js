const Board = require('./board.model');

const ITEM_NOT_FOUND = -1;

class RepositoryBoard {
  constructor() {
    this.arrayboard = [];
  }

  // get
  findById(id) {
    const index = this.receiveId(id);
    if (index === ITEM_NOT_FOUND) {
      return "id isn'not valid";
    }

    return this.arrayboard[index];
  }

  findAll() {
    return this.arrayboard;
  }

  // post
  createboard(board) {
    const createboard = new Board(board);
    this.arrayboard.push(createboard);

    return createboard;
  }

  // put
  editboard(id, board) {
    const index = this.receiveId(id);
    if (index === ITEM_NOT_FOUND) {
      return "id isn'not valid";
    }
    const createboard = new Board(board);
    createboard.id = id;
    this.arrayboard[index] = createboard;
    return createboard;
  }

  // delete
  deleteboard(id) {
    const index = this.receiveId(id);
    if (index === ITEM_NOT_FOUND) {
      return "id isn'not valid";
    }
    this.arrayboard.splice(index, 1);
    return true;
  }

  receiveId(id) {
    const index = this.arrayboard.findIndex((board) => board.id === id);

    return index;
  }
}

module.exports = new RepositoryBoard();
