import low from 'lowdb';
import FileAsync from 'lowdb/adapters/FileAsync';

export default class BaseAccessor {
  constructor(filename, defaultValue) {
      const { DATA_DIR = 'data' } = process.env;
      const adapter = new FileAsync(`${DATA_DIR}/${filename}.json`);
      low(adapter).then(inst => {
          this.instance = inst;
          this.instance.defaults(defaultValue).write();
      });
  }

  find(path) {
    path = path
      .filter(p => p)
      .map(e => {
        if (typeof e === 'string') {
          return { key: e };
        }
        return e;
      });

    let target = this.instance;
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

  get(path = []) {
    const target = this.find([...path]);
    if (target) {
      return target
        .cloneDeep()
        .value();
    } else {
      return undefined;
    }
  }

  async push(path = [], value) {
      await this.find([...path])
          .push(value)
          .write();
  }
}