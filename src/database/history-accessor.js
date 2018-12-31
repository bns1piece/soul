import BaseAccessor from './base-accessor';

class HistoryAccessor extends BaseAccessor {
  constructor() {
      super('history', {
          servers: {},
      });
  }

  list(server, world) {
      return this.get(['servers', server, world]);
  }

  updateBoss(server, world, field, channel, value) {
      super.set([
        { key: 'servers', default: {} },
        { key: server, default: {} },
        { key: world, default: {} },
        { key: field, default: {} },
        { key: channel, default: {} },
      ], 'boss', value);
  }
}


export default new HistoryAccessor();
