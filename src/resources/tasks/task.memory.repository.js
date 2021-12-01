const Task = require('./task.model');

const ITEM_NOT_FOUND = -1;

class RepositoryTask {
  constructor() {
    this.arrayTask = [];
  }

  // get
  findById(id) {
    const index = this.receiveId(id);
    if (index === ITEM_NOT_FOUND) {
      return "id isn'not valid";
    }

    return this.arrayTask[index];
  }

  findAll() {
    return this.arrayTask;
  }

  // post
  createTask(task) {
    const createTask = new Task(task);
    this.arrayTask.push(createTask);

    return createTask;
  }

  // put
  editTask(id, task) {
    const index = this.receiveId(id);
    if (index === ITEM_NOT_FOUND) {
      return "id isn'not valid";
    }
    const createtask = new Task(task);
    createtask.id = id;
    this.arrayTask[index] = createtask;
    return createtask;
  }

  // delete
  deleteTask(id) {
    const index = this.receiveId(id);
    if (index === ITEM_NOT_FOUND) {
      return "id isn'not valid";
    }
    this.arrayTask.splice(index, 1);
    return true;
  }

  receiveId(id) {
    const index = this.arrayTask.findIndex((task) => task.id === id);

    return index;
  }
}

module.exports = new RepositoryTask();
