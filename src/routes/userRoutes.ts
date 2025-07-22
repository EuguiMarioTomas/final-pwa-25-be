import express from 'express';

import{
  createUser,
  updateUser,
  deleteUser,
  softDeleteUser,
}from '../controllers/userControllers';

const router = express.Router();

router.post('/createUser', createUser);
router.put('/updateUser/:id', updateUser);
router.delete('/delete/:id', deleteUser);
router.patch('/softDelete/:id', softDeleteUser);

export default router;