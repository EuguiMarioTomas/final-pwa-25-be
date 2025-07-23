import express from 'express';

import {
  createReminder,
  getRemindersByAuthor,
  getSharedReminders,
  getArchivedRemindersByAuthor,
  updateReminder,
  sharedWith,
  softDeleteReminder,
}from '../controllers/reminderControllers';

const router = express.Router();

router.post('/createReminder', createReminder);
router.get('/getRemindersByAuthor/:authorId', getRemindersByAuthor);
router.get('/getSharedReminders/:userId', getSharedReminders);
router.get('/getArchivedRemindersByAuthor/:authorId', getArchivedRemindersByAuthor);
router.put('/updateReminder/:id', updateReminder);
router.patch('/sharedReminder/:reminderId', sharedWith);
router.patch('/softDeleteReminder/:reminderId', softDeleteReminder);

export default router;