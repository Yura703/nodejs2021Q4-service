const { v4: uuidv4 } = require('uuid');

function initColumns(columns) {
  if (Array.isArray(columns) && columns.length > 0) {
    const _columns = columns;

    for (let i = 0; i < _columns.length; i += 1) {
      _columns[i].id = uuidv4();
    }

    return _columns;
  }
  return [];
}
class Board {
  constructor({ id = uuidv4(), title = 'BOARD', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = initColumns(columns);
  }
}

module.exports = Board;
