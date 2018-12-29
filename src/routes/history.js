import express from 'express';

import serverAccessor from '../database/server-accessor';
import historyAccessor from '../database/history-accessor';
import bossAccessor from '../database/boss-accessor';

const router = express.Router();

router.get('/servers/:server/bosses', (req, res) => {
  const { server } = req.params;
  res.json(historyAccessor.list(server) || {});
});

router.post('/servers/:server/bosses/:boss/channels/:channel', async (req, res) => {
  const { server, boss, channel } = req.params;
  const { time } = req.body;

  if (!serverAccessor.list().find(s => s.id === server)) {
    res.sendStatus(404);
    return;
  }

  if (!bossAccessor.list().find(b => b.id === boss)) {
    res.sendStatus(404);
    return;
  }
  await historyAccessor.update(server, boss, channel, { 
    time 
  });

  res.sendStatus(200);
});

export default router;
