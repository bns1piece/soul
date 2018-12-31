import express from 'express';

import mapAccessor from '../database/map-accessor';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(mapAccessor.list() || []);
});

export default router;
