import BaseAccessor from './base-accessor';

class BossAccessor extends BaseAccessor {
  constructor() {
      super('boss', {
          servers: {},
      });
  }

  list(server) {
      return this.get(['servers', server]);
  }

  push(server, world, field, channel, value) {
      super.push([
        { key: 'servers', default: {} },
        { key: server, default: {} },
        { key: world, default: {} },
        { key: field, default: {} },
        { key: channel, default: [] },
      ], value);
  }
}


export default new BossAccessor();
