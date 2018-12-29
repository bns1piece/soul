import express from 'express';

import serverAccessor from '../database/server-accessor';
import bossAccessor from '../database/boss-accessor';

const router = express.Router();

router.post('/servers', (req, res) => {
  const {  sid, name } = req.body;
  if (req.get('api-key') !== 'blade8soul') {
    res.sendStatus(401);
    return;
  }

  if (serverAccessor.list().find((s => s.sid === sid))) {
    res.sendStatus(409);
    return;
  }

  serverAccessor.push({ sid, name });
  res.sendStatus(200);
});

router.get('/servers', (req, res) => {
  res.json(serverAccessor.list());
});

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
