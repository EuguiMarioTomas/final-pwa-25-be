import express from 'express';

import userRoutes from './routes/userRoutes';
import reminderRoutes from './routes/reminderRoutes';

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/reminders', reminderRoutes);

app.get('/', (req, res) => {
  res.send('app funcionando correctamente.🟢');
});

export default app;