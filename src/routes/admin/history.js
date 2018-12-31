import express from 'express';

import historyAccessor from '../../database/history-accessor';

const router = express.Router();

router.get('/servers', (req, res) => {
  res.json(historyAccessor.list() || {});
});

export default router;
