import low from 'lowdb';
import FileAsync from 'lowdb/adapters/FileAsync';

import BaseAccessor from './base-accessor';

class BossAccessor extends BaseAccessor {
    constructor(filename) {
        super();
        const { DATA_DIR = 'data' } = process.env;
        const adapter = new FileAsync(`${DATA_DIR}/${filename}.json`);
        low(adapter).then(inst => {
            this.instance = inst;
            this.instance.defaults({
                servers: {},
            }).write();
        });
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

export default new BossAccessor('boss');