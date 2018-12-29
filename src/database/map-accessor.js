import BaseAccessor from './base-accessor';

class WorldAccessor extends BaseAccessor {
    constructor() {
        super('world', {
            worlds: [],
        });
    }

    list() {
        return super.get(['worlds']);
    }

    findWorld(id) {
        return this.list()
            .find(world => world.id === id);
    }

    findField(worldId, fieldId) {
        const world = this.findWorld(worldId);
        if (!world || !world.fields) {
            return undefined;
        }
        
        return world.fields.find(field => field.id === fieldId);
    }

    push(world) {
        super.push(['worlds'], world);
    }
}

export default new WorldAccessor();
