import express from 'express';

import mapAccessor from '../database/map-accessor';
import bossAccessor from '../database/boss-accessor';

const router = express.Router();

router.post('/', (req, res) => {
  const {  wid, fid, id, name, interval } = req.body;
  if (req.get('api-key') !== 'blade8soul') {
    res.sendStatus(401);
    return;
  }

  if (!wid || !wid || !id || !name || !interval) {
    res.sendStatus(400);
    return;
  }

  if (!mapAccessor.findField(wid, fid)) {
    res.sendStatus(400);
    return;
  }

  if (bossAccessor.find(id)) {
    res.sendStatus(409);
    return;
  }

  bossAccessor.push({ wid, fid, id, name, interval });
  res.sendStatus(200);
});

router.get('/', (req, res) => {
  res.json(bossAccessor.list() || []);
});

export default router;
