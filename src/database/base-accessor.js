export default class BaseAccessor {
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
}