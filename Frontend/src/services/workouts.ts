export async function getWorkouts() {
  const res = await fetch("http://localhost:3000/workouts");
  if (!res.ok) throw new Error("Erro ao buscar treinos");
  return res.json();
}

type CreateWorkoutData = {
  name: string;
  studentId: number;
};

export async function createWorkout(data: CreateWorkoutData) {
  const res = await fetch("http://localhost:3000/workouts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao criar treino");
  return res.json();
}

export async function deleteWorkout(id: number) {
  const res = await fetch(`http://localhost:3000/workouts/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Erro ao deletar treino");
}