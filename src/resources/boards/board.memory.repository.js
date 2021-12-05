const { validate, v4: uuidv4 } = require('uuid');
const Board = require('./board.model');

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

    const boardDb = this.arrayBoard[index];
    if (board.columns.length !== 0) {
      boardDb.column = RepositoryBoard.editColumn(
        board.columns,
        boardDb.columns
      );
    }
    boardDb.title = board.title;

    this.arrayBoard[index] = boardDb;

    return boardDb;
  }

  // delete
  async deleteBoard(id) {
    const index = await this.receiveId(id);
    if (index === ITEM_NOT_FOUND) {
      return 'id not found';
    }

    await this.arrayBoard.splice(index, 1);
    return true;
  }

  receiveId(id) {
    const index = this.arrayBoard.findIndex((board) => board.id === id);

    return index;
  }

  static editColumn(columnsFromRequest, columnsFromDb) {
    const _columnsFromDb = columnsFromDb;

    columnsFromRequest.forEach((column) => {
      if (validate(column.id)) {
        const index = RepositoryBoard.findIdInColumns(columnsFromDb, column.id);
        if (index !== ITEM_NOT_FOUND) {
          _columnsFromDb[index] = column;
        } else {
          const _column = column;
          _column.id = uuidv4();
          _columnsFromDb.push(_column);
        }
      } else {
        const _column = column;
        _column.id = uuidv4();
        _columnsFromDb.push(_column);
      }
    });

    return _columnsFromDb;
  }

  static findIdInColumns(columnsFromDb, id) {
    return columnsFromDb.findIndex((column) => column.id === id);
  }
}

module.exports = new RepositoryBoard();
