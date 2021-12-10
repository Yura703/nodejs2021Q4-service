import { Board } from './board.model';

const ITEM_NOT_FOUND = -1;

class RepositoryBoard {
  arrayBoard: Board[];

  /**
   * Constructor that creates instances of the class RepositoryBoard
   * @returns empty array
   */
  constructor() {
    this.arrayBoard = [];
  }

 /**
  * Get object Board by ID from Repository 
  * @param id - object Board ID in uuid format
  * @returns object Board or error message
  */
  findById(id: string) {
    const index = this.receiveId(id);
    if (index === ITEM_NOT_FOUND) {
      return 'id not found';
    }

    return this.arrayBoard[index];
  }

  /**
   * Get all objects Board from Repository 
   * @returns all objects Board from Repository 
   */
  findAll() {
    return this.arrayBoard;
  }

 /**
  * Create new object Board in Repository 
  * @param board - the Board object received from the user
  * @returns board object created in the Repository
  */
  createBoard(board: Board) {
    const createBoard = new Board(board);
    this.arrayBoard.push(createBoard);

    return createBoard;
  }

  /**
   * Modifying the Board object while keeping the original ID
   * @param id - the id of the Board object to be modified
   * @param board - Board object with new data
   * @returns a Board object saved in the Repository after a change or an error message
   */
  editBoard(id: string, board: Board) {
    const index = this.receiveId(id);
    if (index === ITEM_NOT_FOUND) {
      return "id isn'not valid";
    }
    const boardDb: Board = this.arrayBoard[index];
    boardDb.columns = board.columns;
    boardDb.title = board.title;
    this.arrayBoard[index] = boardDb;

    return boardDb;
  }

  /**
   * Removing a Board object by ID from the Repository
   * @param id - D of the Board object to remove 
   * @returns true on success, on error - an error message
   */
  async deleteBoard(id: string) {
    const index = await this.receiveId(id);
    if (index === ITEM_NOT_FOUND) {
      return 'id not found';
    }
    await this.arrayBoard.splice(index, 1);
    
    return true;
  }

  /**
   * Searching the Repository for an object with a given ID
   * @param id - Object ID to search
   * @returns index of the object with the given ID in the Repository array, or -1 if it is absent
   */
  receiveId(id: string) {
    const index = this.arrayBoard.findIndex((board) => board.id === id);

    return index;
  }    
}

export = new RepositoryBoard();
