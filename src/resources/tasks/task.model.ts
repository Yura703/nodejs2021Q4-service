import { v4 as uuidv4 } from 'uuid';

interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string | null;
}

export interface ITaskDto {  
  //id: undefined;
  title: string;
  order: number;
  description: string;
  userId: null | undefined;
  boardId: string;
  columnId: null | undefined;
}

export class Task implements ITask {
  constructor({
    title = 'TASK',
    order = 0,
    description = '',
    userId = null,
    boardId= '',
    columnId= null,
  } = {}) {
    this.id = uuidv4();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string | null;
}


