import express from 'express';

import {
  createReminder,
  updateReminder,
  sharedWith,
  softDeleteReminder,
}from '../controllers/reminderControllers';

const router = express.Router();

router.post('/createReminder', createReminder);
router.put('/updateReminder/:id', updateReminder);
router.patch('/sharedReminder/:reminderId', sharedWith);
router.patch('/softDeleteReminder/:reminderId', softDeleteReminder);

export default router;