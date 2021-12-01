const RepositoryTasks = require('./task.memory.repository');

const findById = (id) => RepositoryTasks.findById(id);

const findAll = () => RepositoryTasks.findAll();

const createTask = (task) => RepositoryTasks.createtask(task);

const editTask = (id, task) => RepositoryTasks.edittask(id, task);

const deleteTask = (id) => RepositoryTasks.deletetask(id);

module.exports = { findById, findAll, createTask, editTask, deleteTask };
