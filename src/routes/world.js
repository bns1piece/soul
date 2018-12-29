import express from 'express';

import worldsAccessor from '../database/world-accessor';

const router = express.Router();

router.post('/', (req, res) => {
  const {  id, name, fields } = req.body;
  if (req.get('api-key') !== 'blade8soul') {
    res.sendStatus(401);
    return;
  }

  if (!id || !name || !fields) {
    res.sendStatus(400);
    return;
  }

  if (!fields.every(f => f.id)) {
    res.sendStatus(400);
    return;
  }

  if (worldsAccessor.list().find((w => w.id === id))) {
    res.sendStatus(409);
    return;
  }

  worldsAccessor.push({ id, name, fields });
  res.sendStatus(200);
});

router.get('/', (req, res) => {
  res.json(worldsAccessor.list() || []);
});

export default router;
