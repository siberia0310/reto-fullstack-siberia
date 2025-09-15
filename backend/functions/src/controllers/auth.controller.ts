import { Request, Response } from 'express';
import { authService } from '../dependencies';

export const verifyTokenController = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    const decodedToken = await authService.verifyToken(token);
    res.status(200).json(decodedToken);
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const getUserByEmailController = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const user = await authService.getUserByEmail(email);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Error del servidor' });
  }
};


export const createUserController = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await authService.createUser(email);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

