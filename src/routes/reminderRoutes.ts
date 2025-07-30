import express from 'express';

import {
  createReminder,
  getRemindersByAuthor,
  getSharedReminders,
  getArchivedRemindersByAuthor,
  getReminderById,
  getUpcomingReminders,
  updateReminder,
  sharedWith,
  softDeleteReminder,
}from '../controllers/reminderControllers';

const router = express.Router();

router.post('/createReminder', createReminder);
router.get('/getRemindersByAuthor/:authorId', getRemindersByAuthor);
router.get('/getSharedReminders/:userId', getSharedReminders);
router.get('/getArchivedRemindersByAuthor/:authorId', getArchivedRemindersByAuthor);
router.get('/getReminderById/:reminderId', getReminderById);
router.get('/getUpcomingReminders/:authorId', getUpcomingReminders);
router.put('/updateReminder/:reminderId', updateReminder);
router.patch('/sharedReminder/:reminderId', sharedWith);
router.patch('/softDeleteReminder/:reminderId', softDeleteReminder);

export default router;