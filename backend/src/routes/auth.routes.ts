import { Router } from 'express';
import { db } from '../utils/firebase';
import admin from 'firebase-admin';

const router = Router();
const usersCollection = db.collection('users');

// Verificar usuario
router.get('/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const snapshot = await usersCollection.where('email', '==', email).get();

    if (snapshot.empty) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const user = snapshot.docs[0].data();
    return res.json({ id: snapshot.docs[0].id, ...user });
  } catch (error) {
    console.error('Error verificando usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Crear usuario
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;

    const newUser = {
      email,
      createdAt: admin.firestore.Timestamp.now()
    };

    const docRef = await usersCollection.add(newUser);

    res.json({ id: docRef.id, ...newUser });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;
