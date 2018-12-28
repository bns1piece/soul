import express from 'express';

import bossAccessor from '../database/boss-accessor';

const router = express.Router();

router.get('/servers/:server/fields/:field?', (req, res) => {
  const { server, field } = req.params;
  res.json(bossAccessor.get([server, 'fields', field]) || {});
});

router.post('/servers/:server/fields/:field/channels/:channel', async (req, res) => {
  const { server, field, channel } = req.params;
  const { time } = req.query;
  await bossAccessor.push([
    { key: server, default: {}},
    { key: 'fields', default: {}},
    { key: field, default: {}},
    { key: channel, default: []},
  ], { time });

  res.sendStatus(200);
});

export default router;
