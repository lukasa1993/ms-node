import { Router } from 'express';
import homedoc    from './homedoc/index.js';

const router = Router({ mergeParams: true });

router.use('/doc', homedoc);

export default router;
