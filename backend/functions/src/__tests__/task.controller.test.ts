import request from 'supertest';
import express from 'express';
import taskRoutes from '../routes/task.routes';

const app = express();
app.use(express.json());
app.use('/api/tasks', taskRoutes);

describe('Task API', () => {
  it('GET /api/tasks should return 200', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
