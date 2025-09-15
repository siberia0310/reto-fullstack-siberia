import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import tasksRoutes from './routes/task.routes';

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());


app.use('/auth', authRoutes);
app.use('/tasks', tasksRoutes);

export const api = functions.https.onRequest(app);
