import BaseAccessor from './base-accessor';

class BossAccessor extends BaseAccessor {
    constructor() {
        super('boss', {
            bosses: [],
        });
    }

    list() {
        return this.get(['bosses']);
    }

    push(boss) {
        super.push(['bosses'], boss);
    }
}

export default new BossAccessor();
