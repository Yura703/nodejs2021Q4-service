const RepositoryUsers = require('./user.memory.repository');
const RepositoryTasks = require('../tasks/task.memory.repository');

const findById = (id) => RepositoryUsers.findById(id);

const findAll = () => RepositoryUsers.findAll();

const createUser = (user) => RepositoryUsers.createUser(user);

const editUser = (id, user) => RepositoryUsers.editUser(id, user);

const deleteUser = (id) => {
  RepositoryUsers.deleteUser(id);
  RepositoryTasks.updateTaskByUserId(id);
};

module.exports = { findById, findAll, createUser, editUser, deleteUser };
