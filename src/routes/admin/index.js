import express from 'express';

import serverRouter from './server';
import worldRouter from './world';
import historyRouter from './history';

const router = express.Router();

router.use((req, res, next) => {
  if (req.get('api-key') !== 'blade8soul') {
    res.sendStatus(403);
    return;
  }
  next();
});

router.use('/servers', serverRouter);
router.use('/worlds', worldRouter);
router.use('/histories', historyRouter);

export default router;
