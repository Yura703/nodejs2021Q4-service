import { Task, ITaskDto } from './task.model';
import RepositoryBoard from '../boards/board.memory.repository';

const ITEM_NOT_FOUND = -1;

class RepositoryTask {
  arrayTask: Task[];
  constructor() {
    this.arrayTask = [];
  }

  // get
  findById(boardId: string, taskId: string) {
    const index = this.receiveTaskId(taskId);
    if (index === ITEM_NOT_FOUND || !RepositoryTask.receiveBoardId(boardId)) {
      return "id isn'not valid";
    }

    return this.arrayTask[index];
  }

  findAll(boardId: string) {
    if (!RepositoryTask.receiveBoardId(boardId)) {
      return "id isn'not valid";
    }

    return this.arrayTask.filter((task) => task.boardId === boardId);
  }

  // post
  createTask(boardId: string, task: ITaskDto) {
    if (!RepositoryTask.receiveBoardId(boardId)) {
      return "id isn'not valid";
    }

    const createTask = new Task(task);
    createTask.boardId = boardId;
    this.arrayTask.push(createTask);

    return createTask;
  }

  // put
  editTask(boardId: string, taskId: string, task: ITaskDto) {
    const index = this.receiveTaskId(taskId);
    if (index === ITEM_NOT_FOUND || !RepositoryTask.receiveBoardId(boardId)) {
      return "id isn'not valid";
    }

    const createtask = new Task(task);
    createtask.id = taskId;
    createtask.boardId = boardId;

    this.arrayTask[index] = createtask;

    return createtask;
  }

  // delete
  async deleteTask(boardId: string, taskId: string) {
    const index = this.receiveTaskId(taskId);
    if (index === ITEM_NOT_FOUND || !RepositoryTask.receiveBoardId(boardId)) {
      return "id isn'not valid";
    }

    await this.arrayTask.splice(index, 1);
    return true;
  }

  // When somebody DELETEs Board, all its Tasks should be deleted as well.
  deleteTaskByBoardId(boardId: string) {
    const tempArray = this.arrayTask.filter((task) => task.boardId !== boardId);
    this.arrayTask = tempArray;

    return this.arrayTask.length - tempArray.length;
  }

  // When somebody DELETEs User, all Tasks where User is assignee should be updated to put userId = null.
  async updateTaskByUserId(userId: string): Promise< Task | true> {
    const tempArray = await this.arrayTask.map((task) => {
      const _task = task;
      if (_task.userId === userId) {
        _task.userId = null;
      }
      return _task;
    });
    this.arrayTask = tempArray;

    return true;
  }

  receiveTaskId(taskId: string) {
    return this.arrayTask.findIndex((task) => task.id === taskId);
  }

  static receiveBoardId(boardId: string) {
    const result = RepositoryBoard.findById(boardId);
    return typeof result !== 'string';
  }
}

export = new RepositoryTask();
