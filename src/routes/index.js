import express from 'express';

import fieldsRouter from './fields';

const router = express.Router();
router.use('/fields', fieldsRouter);

export default router;
