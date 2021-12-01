const { v4: uuidv4 } = require('uuid');

class Board {
  constructor({ id = uuidv4(), title = 'BOARD', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    if (Array.isArray(columns) && columns.length > 0) {
      columns.forEach((element) => {
        // eslint-disable-next-line no-param-reassign
        element.id = uuidv4();
      });
    }
    this.columns = columns;
  }
}

module.exports = Board;
