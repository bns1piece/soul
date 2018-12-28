import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const { DATA_DIR = 'data' } = process.env;

const adapter = new FileSync(`${DATA_DIR}/data.json`);
const db = low(adapter);

db.defaults({fields: {}}).write();

function find(path) {
  path = path
    .filter(p => p)
    .map(e => {
      if (typeof e === 'string') {
        return { key: e };
      }
      return e;
    });

  let target = db;
  while (path.length) {
    const p = path.shift();
    if (!target.has(p.key).value()) {
      if (p.hasOwnProperty('default')) {
        target = target.set(p.key, p.default)
      } else {
        return undefined;
      }
    }
    target = target.get(p.key);
  }

  return target;
}

export default {
  get(path = []) {
    const target = find([...path]);
    if (target) {
      return target
        .cloneDeep()
        .value();
    } else {
      return undefined;
    }
  },
  push(path = [], value) {
    find([...path])
      .push(value)
      .write();
  }
}
