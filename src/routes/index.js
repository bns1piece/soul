import express from 'express';

import serverRouter from './server';
import worldRouter from './world';
import bossRouter from './boss';

const router = express.Router();

router.use('/servers/:server/worlds', bossRouter);
router.use('/servers', serverRouter);
router.use('/worlds', worldRouter);

export default router;