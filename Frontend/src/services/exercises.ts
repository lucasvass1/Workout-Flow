const API_URL =
  "https://workout-flow.onrender.com";

function getToken() {
  return localStorage.getItem("token");
}

export async function getExercises(
  workoutId: number
) {
  const res = await fetch(
    `${API_URL}/workouts/${workoutId}/exercises`,
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
  data: {
    name: string;
    sets: number;
    reps: number;
    weight?: number | null;
  }
) {
  const res = await fetch(
    `${API_URL}/workouts/${workoutId}/exercises`,
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

export async function deleteExercise(
  id: number
) {
  const res = await fetch(
    `${API_URL}/exercises/${id}`,
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