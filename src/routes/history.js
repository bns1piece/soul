import express from 'express';

import serverAccessor from '../database/server-accessor';
import historyAccessor from '../database/history-accessor';

const router = express.Router();

router.get('/servers/:server/bosses', (req, res) => {
  const { server } = req.params;
  res.json(historyAccessor.list(server) || {});
});

router.post('/servers/:server/bosses', async (req, res) => {
  const { server } = req.params;
  const { world, field, channel, time } = req.body;

  if (!serverAccessor.list().find(s => s.id === server)) {
    res.sendStatus(404);
    return;
  }

  await historyAccessor.update(server, world, field, channel, { 
    time 
  });

  res.sendStatus(200);
});

export default router;
