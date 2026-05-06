import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            userId?: number; // Adiciona a propriedade userId ao tipo Request
        }
    }
}

const JWT_SECRET = process.env.JWT_SECRET!;

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }
console.log("AUTH HEADER:", req.headers.authorization);
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

    req.userId = decoded.userId;

    next();
  } catch {
    return res.status(401).json({ message: 'Token inválido' });
  }
}
