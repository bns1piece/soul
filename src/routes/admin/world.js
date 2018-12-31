import express from 'express';

import mapAccessor from '../../database/map-accessor';

const router = express.Router();

router.post('/', (req, res) => {
  const {  id, name, fields } = req.body;

  if (!id || !name || !fields) {
    res.sendStatus(400);
    return;
  }

  if (!fields.every(f => f.id)) {
    res.sendStatus(400);
    return;
  }

  if (mapAccessor.findWorld(id)) {
    res.sendStatus(409);
    return;
  }

  mapAccessor.push({ id, name, fields });
  res.sendStatus(200);
});

export default router;
