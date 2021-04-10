import { Router } from 'express';
import {
  addUser,
  getUsers
}                 from './actions.js';

const router = Router({ mergeParams: true });

router.get('/', getUsers);
router.post('/', addUser);

export default router;
