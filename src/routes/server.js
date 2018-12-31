import express from 'express';

import serverAccessor from '../database/server-accessor';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(serverAccessor.list());
});

export default router;
