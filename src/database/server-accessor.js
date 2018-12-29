import BaseAccessor from './base-accessor';

class ServerAccessor extends BaseAccessor {
    constructor() {
        super('server', {
            servers: [],
        });
    }

    list() {
        return this.get(['servers']);
    }

    push(server) {
        super.push(['servers'], server);
    }
}

export default new ServerAccessor();
