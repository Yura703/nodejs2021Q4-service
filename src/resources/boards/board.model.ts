import { v4 as uuidv4 } from 'uuid';

export interface IColumn {
  id?: string;
  title: string;
  order: number;
}
export interface IBoard {
  id?: string;
  title: string;
  columns?: IColumn[] | [];
}

/**
 * Adding an ID to the columns property in the Board object
 * @param columns - the columns property from the Board object received from the user
 * @returns property columns with generated ID
 */
function initColumns(columns: IColumn[] | [] | undefined): IColumn[] | [] {
  if (Array.isArray(columns) && columns.length > 0) {
    const _columns = columns;

    for (let i = 0; i < _columns.length; i += 1) {
      _columns[i].id = uuidv4();
    }

    return _columns;
  }
  return [];
}

export class Board implements IBoard{
  /**
   * Constructor forming an object of the Board class
   * @param board - the IBoard interface object received from the user
   *  @returns object of the Board class 
   */
  constructor(board : IBoard) {
    this.id = uuidv4();
    this.title = board.title;
    this.columns = initColumns(board.columns);
  }

  id?: string;

  title: string;

  columns?: IColumn[];
}
