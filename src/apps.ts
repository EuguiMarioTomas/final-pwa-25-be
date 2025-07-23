import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes';
import reminderRoutes from './routes/reminderRoutes';

dotenv.config();

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(cors({
  origin: FRONTEND_URL, // Cambia esto al origen de tu frontend
  credentials: true,
}));

app.use(express.json());

app.use('/users', userRoutes);
app.use('/reminders', reminderRoutes);

app.get('/', (req, res) => {
  res.send('app funcionando correctamente.🟢');
});

export default app;