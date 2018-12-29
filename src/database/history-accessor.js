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

  update(server, boss, channel, value) {
      super.set([
        { key: 'servers', default: {} },
        { key: server, default: {} },
        { key: boss, default: {} },
      ], channel, value);
  }
}


export default new HistoryAccessor();
