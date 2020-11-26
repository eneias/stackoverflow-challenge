import express from 'express';

import user from './user';

const router = express.Router();

router.use('/user', user);
router.use('/user/search/:text', user);
router.use('/user/:userId', user);

export default router;
