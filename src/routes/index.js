import express from 'express';

import serverRouter from './server';
import worldRouter from './world';
import bossRouter from './boss';
import historyRouter from './history';

const router = express.Router();

router.use('/servers', serverRouter);
router.use('/worlds', worldRouter);
router.use('/bosses', bossRouter);
router.use('/histories', historyRouter);

export default router;