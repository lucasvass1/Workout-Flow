import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET;

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
console.log("AUTH HEADER:", authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];
   console.log("TOKEN RECEBIDO:", token);

  try {
    const decoded = jwt.verify(token, JWT_SECRET!) as { userId: number };

    console.log("TOKEN DECODED:", decoded);

    req.userId = decoded.userId;

    console.log("USER ID EXTRAÍDO:", req.userId);

    return next();
  } catch (err) {
    console.log("ERRO JWT:", err);
    return res.status(401).json({ message: "Token inválido" });
  }
}