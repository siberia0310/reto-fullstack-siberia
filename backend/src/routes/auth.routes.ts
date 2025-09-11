import { Router } from 'express';

const router = Router();

// Mock de usuarios en memoria
let users: { email: string }[] = [
  { email: 'demo@demo.com' }
];


router.get('/:email', (req, res) => {
  const { email } = req.params;
  const user = users.find(u => u.email === email);

  if (user) {
    res.json({ exists: true, user });
  } else {
    res.json({ exists: false });
  }
});

// POST /auth → agrega un nuevo usuario
router.post('/', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email requerido' });
  }

  const exists = users.some(u => u.email === email);
  if (exists) {
    return res.status(400).json({ message: 'El usuario ya existe' });
  }

  const newUser = { email };
  users.push(newUser);

  res.status(201).json({ message: 'Usuario creado', user: newUser });
});

export default router;
