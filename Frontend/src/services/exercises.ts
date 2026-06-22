import { API_ENDPOINTS } from "../config/constants";

function getToken() {
  return localStorage.getItem("token");
}

export type ExercisePayload = {
  name: string;
  sets: number;
  reps: number;
  weight?: number | null;
};

export async function getExercises(
  workoutId: number
) {
  
  const res = await fetch(
    API_ENDPOINTS.EXERCISES(workoutId),
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(
      "Erro ao buscar exercícios"
    );
  }

  return res.json();
}

export async function createExercise(
  workoutId: number,
  data: ExercisePayload
) {
 
  const res = await fetch(
    API_ENDPOINTS.EXERCISES(workoutId),
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",

        Authorization: `Bearer ${getToken()}`,
      },

      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    throw new Error(
      "Erro ao criar exercício"
    );
  }

  return res.json();
}

export async function updateExercise(
  id: number,
  data: Partial<ExercisePayload>
) {
  const res = await fetch(
    API_ENDPOINTS.EXERCISE(id),
    {
      method: "PUT",

      headers: {
        "Content-Type":
          "application/json",

        Authorization: `Bearer ${getToken()}`,
      },

      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    throw new Error(
      "Erro ao atualizar exercício"
    );
  }

  return res.json();
}

export async function deleteExercise(
  id: number
) {
  
  const res = await fetch(
    API_ENDPOINTS.EXERCISE(id),
    {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(
      "Erro ao deletar exercício"
    );
  }
}