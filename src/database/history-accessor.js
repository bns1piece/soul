import BaseAccessor from './base-accessor';

class HistoryAccessor extends BaseAccessor {
  constructor() {
      super('history', {
          servers: {},
      });
  }

  list(server) {
      return this.get(['servers', server]);
  }

  update(server, world, field, channel, value) {
      super.set([
        { key: 'servers', default: {} },
        { key: server, default: {} },
        { key: world, default: {} },
        { key: field, default: {} },
      ], channel, value);
  }
}


export default new HistoryAccessor();
