import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import { authenticateToken } from "./middleware/auth.js";
import { register } from "./auth/register.js";
import { StudentController } from "./controllers/studentController.js";
import { WorkoutController } from "./controllers/workoutController.js";
import { DashboardController } from "./controllers/dashboardController.js";
import { DashboardService } from "./services/dashboardService.js";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

const app = express();

const corsOptions = {
  origin: "*",
  credentials: false,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/auth", authRoutes);
app.post("/register", register);

const PORT = 3000;

//STUDENTS ROUTES
app.get(
  "/students",
  authenticateToken,
  StudentController.getStudents.bind(StudentController)
);

app.post(
  "/students",
  authenticateToken,
  StudentController.createStudent.bind(StudentController)
);

app.put(
  "/students/:id",
  authenticateToken,
  StudentController.updateStudent.bind(StudentController)
);

app.delete(
  "/students/:id",
  authenticateToken,
  StudentController.deleteStudent.bind(StudentController)
);

//WORKOUTS ROUTES
app.get(
  "/workouts",
  authenticateToken,
  WorkoutController.getWorkouts.bind(WorkoutController)
);

app.post(
  "/workouts",
  authenticateToken,
  WorkoutController.createWorkout.bind(WorkoutController)
);

app.put(
  "/workouts/:id",
  authenticateToken,
  WorkoutController.updateWorkout.bind(WorkoutController)
);

app.delete(
  "/workouts/:id",
  authenticateToken,
  WorkoutController.deleteWorkout.bind(WorkoutController)
);

//EXERCISES ROUTES
app.get(
  "/workouts/:id/exercises",
  authenticateToken,
  WorkoutController.getExercises.bind(WorkoutController)
);

app.post(
  "/workouts/:id/exercises",
  authenticateToken,
  WorkoutController.createExercise.bind(WorkoutController)
);

app.put(
  "/exercises/:id",
  authenticateToken,
  WorkoutController.updateExercise.bind(WorkoutController)
);

app.delete(
  "/exercises/:id",
  authenticateToken,
  WorkoutController.deleteExercise.bind(WorkoutController)
);

//DASHBOARD ROUTE
app.get(
  "/dashboard",
  authenticateToken,
  DashboardController.getDashboard.bind(DashboardController)
);

// DEBUG ROUTE: Dashboard sem autenticação (apenas para teste)
app.get("/dashboard-test", async (_req, res) => {
  try {
    const data = await DashboardService.getDashboardData(1);
    res.json(data);
  } catch (error) {
    console.error("Erro ao carregar dashboard de teste:", error);
    res.status(500).json({
      error: "Erro ao carregar dashboard",
      message: error instanceof Error ? error.message : "Erro desconhecido",
    });
  }
});

// DEBUG ROUTE (remover em produção)
app.get("/debug-users", async (_req, res) => {
  const { prisma } = await import("./lib/prisma.js");
  const users = await prisma.user.findMany();
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});