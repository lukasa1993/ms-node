import { Router } from 'express';
import users      from './users/index.js';

const router = Router({ mergeParams: true });

router.use('/users', users);

export default router;
