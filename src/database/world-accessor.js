import BaseAccessor from './base-accessor';

class WorldAccessor extends BaseAccessor {
    constructor() {
        super('world', {
            worlds: [],
        });
    }

    list() {
        return this.get(['worlds']);
    }

    push(world) {
        super.push(['worlds'], world);
    }
}

export default new WorldAccessor();
