import express from "express";
import cors from "cors";
import { prisma } from './lib/prisma';

const app = express();

app.use(cors());
app.use(express.json());

// busca todos os alunos no banco
app.get("/students", async (req, res) => {
  const students = await prisma.student.findMany();
  res.json(students);
});

// cria novos alunos no banco 
app.post("/students", async (req, res) => {
  const { name, age, plan } = req.body;

  const student = await prisma.student.create({
    data: {
      name,
      age,
      plan,
    },
  });

  res.status(201).json(student);
});

// atualiza aluno no banco
app.put("/students/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { name, age, plan } = req.body;

  const student = await prisma.student.update({
    where: { id },
    data: { name, age, plan },
  });

  res.json(student);
});

// deleta aluno do banco
app.delete("/students/:id", async (req, res) => {
  const id = Number(req.params.id);

  await prisma.student.delete({
    where: { id },
  });

  res.status(204).send();
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});