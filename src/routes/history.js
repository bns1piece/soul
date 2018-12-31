import express from 'express';

import serverAccessor from '../database/server-accessor';
import historyAccessor from '../database/history-accessor';

const router = express.Router();

router.get('/servers/:server/worlds/:world', (req, res) => {
  const { server, world } = req.params;
  res.json(historyAccessor.list(server, world) || {});
});

router.post('/servers/:server/worlds/:world', async (req, res) => {
  const { server, world } = req.params;
  const { field, channel, time } = req.body;

  if (!serverAccessor.list().find(s => s.id === server)) {
    res.sendStatus(404);
    return;
  }

  await historyAccessor.updateBoss(server, world, field, channel, {
    time
  });

  res.sendStatus(200);
});

export default router;
