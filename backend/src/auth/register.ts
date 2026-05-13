import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client/extension";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function register(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Usuário já registrado",
             });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
        return res.status(201).json({
            id: user.id,
            email: user.email,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Erro ao registrar usuário",

        });
    }
}