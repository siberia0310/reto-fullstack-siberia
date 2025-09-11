import { Router } from 'express';

const router = Router();

// Mock de tareas en memoria
let tasks: { id: number; title: string; completed: boolean }[] = [
  { id: 1, title: 'Tarea demo', completed: false },
  { id: 2, title: 'Preparar reto técnico', completed: true }
];


router.get('/', (req, res) => {
  res.json(tasks);
});

router.post('/', (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'El título es requerido' });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    completed: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const task = tasks.find(t => t.id === Number(id));
  if (!task) {
    return res.status(404).json({ message: 'Tarea no encontrada' });
  }

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(t => t.id === Number(id));

  if (index === -1) {
    return res.status(404).json({ message: 'Tarea no encontrada' });
  }

  const deleted = tasks.splice(index, 1);
  res.json({ message: 'Tarea eliminada', task: deleted[0] });
});

export default router;
