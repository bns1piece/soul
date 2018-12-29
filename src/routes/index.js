import express from 'express';

import serverRouter from './server';
import worldRouter from './world';
import bossRouter from './boss';

const router = express.Router();

router.use('/servers', serverRouter);
router.use('/worlds', worldRouter);
router.use('/bosses', bossRouter);

export default router;