import express from "express";
import cors from "cors";
import { prisma } from "./lib/prisma";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

function parseId(id: string) {
  const parsed = Number(id);
  if (isNaN(parsed)) throw new Error("ID inválido");
  return parsed;
}

app.get("/students", async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.json(students);
  } catch {
    res.status(500).json({ error: "Erro ao buscar alunos" });
  }
});

app.post("/students", async (req, res) => {
  try {
    const { name, age, plan } = req.body;

    if (!name || !age) {
      return res.status(400).json({ error: "Dados inválidos" });
    }

    const student = await prisma.student.create({
      data: {
        name,
        age: Number(age),
        plan,
      },
    });

    res.status(201).json(student);
  } catch {
    res.status(500).json({ error: "Erro ao criar aluno" });
  }
});

app.put("/students/:id", async (req, res) => {
  try {
    const id = parseId(req.params.id);
    const { name, age, plan } = req.body;

    const student = await prisma.student.update({
      where: { id },
      data: {
        name,
        age: Number(age),
        plan,
      },
    });

    res.json(student);
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Aluno não encontrado" });
    }

    res.status(500).json({ error: "Erro ao atualizar aluno" });
  }
});

app.delete("/students/:id", async (req, res) => {
  try {
    const id = parseId(req.params.id);

    await prisma.student.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Aluno não encontrado" });
    }

    res.status(500).json({ error: "Erro ao deletar aluno" });
  }
});

app.get("/workouts", async (req, res) => {
  try {
    const workouts = await prisma.workout.findMany({
      include: {
        student: true,
        exercises: true,
      },
    });

    res.json(workouts);
  } catch {
    res.status(500).json({ error: "Erro ao buscar treinos" });
  }
});

app.post("/workouts", async (req, res) => {
  try {
    const { name, studentId } = req.body;

    if (!name || !studentId) {
      return res.status(400).json({ error: "Dados inválidos" });
    }

    const workout = await prisma.workout.create({
      data: {
        name,
        student: {
          connect: { id: Number(studentId) },
        },
      },
    });

    res.status(201).json(workout);
  } catch (error: any) {
    if (error.code === "P2003") {
      return res.status(400).json({ error: "Aluno não existe" });
    }

    res.status(500).json({ error: "Erro ao criar treino" });
  }
});

app.delete("/workouts/:id", async (req, res) => {
  try {
    const id = parseId(req.params.id);

    await prisma.workout.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Treino não encontrado" });
    }

    res.status(500).json({ error: "Erro ao deletar treino" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.get("/dashboard", async (req, res) => {
  const totalStudents = await prisma.student.count();
  const totalWorkouts = await prisma.workout.count();

  const workoutsPerStudent = await prisma.student.findMany({
    include: {
      _count: {
        select: { workouts: true },
      },
    },
  });

  res.json({
    totalStudents,
    totalWorkouts,
    workoutsPerStudent,
    newStudents: 0,
    revenue: 0,
    growth: 0,
    positiveFeedback: 0,
    negativeFeedback: 0,
  });
});