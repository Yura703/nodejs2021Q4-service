const RepositoryTasks = require('./task.memory.repository');

const findById = (boardId, taskId) => RepositoryTasks.findById(boardId, taskId);

const findAll = (boardId) => RepositoryTasks.findAll(boardId);

const createTask = (boardId, task) => RepositoryTasks.createTask(boardId, task);

const editTask = (boardId, taskId, task) =>
  RepositoryTasks.editTask(boardId, taskId, task);

const deleteTask = (boardId, taskId) =>
  RepositoryTasks.deleteTask(boardId, taskId);

const deleteTaskByBoardId = (id) => RepositoryTasks.deleteTaskByBoardId(id);

const updateTaskByUserId = (id) => RepositoryTasks.updateTaskByUserId(id);

module.exports = {
  findById,
  findAll,
  createTask,
  editTask,
  deleteTask,
  deleteTaskByBoardId,
  updateTaskByUserId,
};
