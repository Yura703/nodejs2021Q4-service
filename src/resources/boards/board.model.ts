import { v4 as uuidv4 } from 'uuid';

interface IBoard {
  id: string;
  title: string;
  columns: IColumn[];
}

export interface IColumn {
  id?: string;
  title: string;
  order: number;
}

function initColumns(columns: IColumn[] | []): IColumn[] | [] {
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
  constructor({ id = uuidv4(), title = 'BOARD', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = initColumns(columns);
  }
  id: string;
  title: string;
  columns: IColumn[];
}
