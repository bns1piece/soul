import express from 'express';

import dbAccessor from '../database/accessor';

const router = express.Router();
router.get('/:field?/:channel?', (req, res) => {
  const { field, channel } = req.params;
  res.json(dbAccessor.get(['fields', field, channel]) || {});
});

router.post('/:field/:channel', async (req, res) => {
  const { field, channel } = req.params;
  const { time } = req.query;
  await dbAccessor.push([
    { key: 'fields', default: {}},
    { key: field, default: {}},
    { key: channel, default: []},
  ], { time });

  res.sendStatus(200);
});

export default router;
