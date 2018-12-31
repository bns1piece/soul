import express from 'express';

import serverAccessor from '../../database/server-accessor';

const router = express.Router();

router.post('/', (req, res) => {
  const {  id, name } = req.body;

  if (!id || !name) {
    res.sendStatus(400);
    return;
  }

  if (serverAccessor.list().find((s => s.id === id))) {
    res.sendStatus(409);
    return;
  }

  serverAccessor.push({ id, name });
  res.sendStatus(200);
});

export default router;
