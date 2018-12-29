import express from 'express';

import bossAccessor from '../database/history-accessor';

const router = express.Router();

router.get('/:world?', (req, res) => {
  const { server, world } = req.params;
  res.json(bossAccessor.list(server) || {});
});

router.post('/:world/fields/:field/channels/:channel', async (req, res) => {
  const { server, world, field, channel } = req.params;
  const { time } = req.query;
  await bossAccessor.push([server, world, field, channel], { 
    time 
  });

  res.sendStatus(200);
});

export default router;
