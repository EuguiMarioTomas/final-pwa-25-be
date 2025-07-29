import express from 'express';

import{
  createUser,
  getUserByFirebaseUid,
  getUserByEmail,
  updateUser,
  deleteUser,
  softDeleteUser,
}from '../controllers/userControllers';

const router = express.Router();

router.post('/createUser', createUser);
router.get('/getUserByFirebaseUid/:firebaseUid', getUserByFirebaseUid);
router.get('/getUserByEmail/:email', getUserByEmail);
router.put('/updateUser/:id', updateUser);
router.delete('/delete/:id', deleteUser);
router.patch('/softDelete/:id', softDeleteUser);

export default router;