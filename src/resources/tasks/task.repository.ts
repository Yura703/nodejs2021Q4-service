import { Task, ITaskDto } from './task.model';
import RepositoryBoard from '../boards/board.repository';

const ITEM_NOT_FOUND = -1;

class RepositoryTask {
  arrayTask: Task[];

  /**
   * Constructor that creates instances of the class RepositoryTask
   * @returns empty array
   */
  constructor() {
    this.arrayTask = [];
  }

  /**
  * Get object Task by ID from Repository 
  * @param boardId - board ID where the task is located
  * @param taskId - object Task ID in uuid format
  * @returns object Task or error message
  */
  findById(boardId: string, taskId: string) {
    const index = this.receiveTaskId(taskId);
    if (index === ITEM_NOT_FOUND || !RepositoryTask.receiveBoardId(boardId)) {
      return "id isn'not valid";
    }

    return this.arrayTask[index];
  }

  /**
   * Get all objects Task from Repository 
   * @param boardId - board ID where the task is located
   * @returns all objects Task from Repository 
   */
  findAll(boardId: string) {
    if (!RepositoryTask.receiveBoardId(boardId)) {
      return "id isn'not valid";
    }

    return this.arrayTask.filter((task) => task.boardId === boardId);
  }

  /**
  * Create new object Task in Repository 
  * @param boardId - board ID where the task is located
  * @param task - the Task object received from the user
  * @returns task object created in the Repository
  */
  createTask(boardId: string, task: ITaskDto) {
    if (!RepositoryTask.receiveBoardId(boardId)) {
      return "id isn'not valid";
    }

    const createTask = new Task(task);
    createTask.boardId = boardId;
    this.arrayTask.push(createTask);

    return createTask;
  }

  /**
   * Modifying the Task object while keeping the original ID
   * @param boardId - board ID where the task is located
   * @param taskId - the id of the Task object to be modified
   * @param task - Task object with new data
   * @returns a Task object saved in the Repository after a change or an error message
   */
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

  /**
   * Removing a Task object by ID from the Repository
   * @param boardId - board ID where the task is located
   * @param taskId - ID of the Task object to remove 
   * @returns true on success, on error - an error message
   */
  async deleteTask(boardId: string, taskId: string) {
    const index = this.receiveTaskId(taskId);
    if (index === ITEM_NOT_FOUND || !RepositoryTask.receiveBoardId(boardId)) {
      return "id isn'not valid";
    }

    await this.arrayTask.splice(index, 1);
    return true;
  }

  /**
   * Deleting Tasks when deleting a board
   * @param boardId - Remote Board ID
   * @returns number of remote objects
   */
  deleteTaskByBoardId(boardId: string) {
    const tempArray = this.arrayTask.filter((task) => task.boardId !== boardId);
    this.arrayTask = tempArray;

    return this.arrayTask.length - tempArray.length;
  }

  /**
   * Updating Tasks when deleting a user
   * @param userId - userId to update Task 
   * @returns Promise task or true
   */
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

  /**
   * Searching the TaskRepository for an object with a given ID
   * @param id - Object ID to search
   * @returns index of the object with the given ID in the Repository array, or -1 if it is absent
   */
  receiveTaskId(taskId: string) {
    return this.arrayTask.findIndex((task) => task.id === taskId);
  }

  /**
   * Сhecks for the presence in the BoardRepository of an object with the given ID
   * @param id - Object ID to search
   * @returns true with a positive search, folse with a negative search
   */
  static receiveBoardId(boardId: string) {
    const result = RepositoryBoard.findById(boardId);
    return typeof result !== 'string';
  }
}

export = new RepositoryTask();
