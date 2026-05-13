import express from "express";
import cors from "cors";
import { prisma } from "./lib/prisma";
import authRoutes from "./routes/auth";
import { authenticateToken } from "./middleware/auth";
import { register} from "./auth/register";

declare global {
    namespace Express {
        interface Request {
            userId?: number; // Adiciona a propriedade userId ao tipo Request
        }
    }
}

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

app.use("/students", authenticateToken);
app.use("/workouts", authenticateToken);
app.use("/dashboard", authenticateToken);

const PORT = 3000;

function parseId(id: string) {
  const parsed = Number(id);
  if (isNaN(parsed)) throw new Error("ID inválido");
  return parsed;
}

app.get("/students", async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Não autorizado" });
    }

    const students = await prisma.student.findMany({
      where: { userId: Number(userId) },
    });

    res.json(students);
  } catch (error) {
  console.error("ERRO REAL:", error);
  res.status(500).json({ error: "Erro ao buscar alunos" });
}
});

app.post("/students", async (req, res) => {
  try {
    const { name, age, plan } = req.body;
    const userId = req.userId;

    if (!name || !age || !userId) {
      return res.status(400).json({ error: "Dados inválidos" });
    }

    const student = await prisma.student.create({
      data: {
        name,
        age: Number(age),
        plan,
        user: {
          connect: { id: Number(userId) },
        },
      },
    });

    res.status(201).json(student);
  } catch (error) {
  console.error("ERRO REAL CREATE STUDENT:", error);
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

app.get("/workouts", async (_req, res) => {
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
    const userId = req.userId;

    if (!name || !studentId || !userId) {
      return res.status(400).json({ error: "Dados inválidos" });
    }

    const workout = await prisma.workout.create({
      data: {
        name,
        user: {
          connect: { id: Number(userId) },
        },
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

app.get("/dashboard", async (_req, res) => {
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
app.get("/debug-users", async (_req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post("/register", register);