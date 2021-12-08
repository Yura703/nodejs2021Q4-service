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

class Task implements ITask {
  constructor({
    id = uuidv4(),
    title = 'TASK',
    order = 0,
    description = '',
    userId = null,
    boardId= '',
    columnId= null,
  } = {}) {
    this.id = id;
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

export = Task;
