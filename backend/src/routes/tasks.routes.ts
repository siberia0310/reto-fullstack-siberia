import { Router } from 'express';
import { db } from '../utils/firebase';
import admin from 'firebase-admin';

const router = Router();
const tasksCollection = db.collection('tasks');

// Obtener todas las tareas
router.get('/', async (req, res) => {
  try {
    const snapshot = await tasksCollection.get();
    const tasks = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt ? data.createdAt.toDate() : null
      };
    });
    res.json(tasks);
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


// Crear tarea
router.post('/', async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    const newTask = {
      title,
      description,
      completed: completed || false,
      createdAt: admin.firestore.Timestamp.now() 
    };

    const docRef = await tasksCollection.add(newTask);
    res.json({ id: docRef.id, ...newTask });
  } catch (error) {
    console.error('Error al crear tarea:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Actualizar tarea
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const updates: any = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (completed !== undefined) updates.completed = completed;

    await tasksCollection.doc(id).update(updates);

    res.json({ id, ...updates });
  } catch (error) {
    console.error('Error al actualizar tarea:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


// Eliminar tarea
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await tasksCollection.doc(id).delete();
    res.json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar tarea:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;
