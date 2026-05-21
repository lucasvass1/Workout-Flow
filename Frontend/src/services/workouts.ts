import { apiFetch } from "./api";

const API_URL = "https://workout-flow.onrender.com";

type CreateWorkoutData = {
  name: string;
  studentId: number;
};

export async function getWorkouts() {
  const res = await apiFetch(`${API_URL}/workouts`);
  if (!res.ok) throw new Error("Erro ao buscar treinos");
  return res.json();
}

export async function createWorkout(data: CreateWorkoutData) {
  console.log("DADOS ENVIADOS:", data);

  const res = await apiFetch(`${API_URL}/workouts`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.error("ERRO BACKEND:", errorData);

    throw new Error(errorData.message || "Erro ao criar treino");
  }

  return res.json();
}

export async function deleteWorkout(id: number) {
  const res = await apiFetch(`${API_URL}/workouts/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Erro ao deletar treino");
}