type StudentPayload = Record<string, unknown>;

const API_URL = "https://workout-flow.onrender.com";

export async function getStudents() {
  const res = await fetch(`${API_URL}/students`);
  if (!res.ok) throw new Error("Erro ao buscar alunos");
  return res.json();
}

export async function createStudent(data: StudentPayload) {
  const res = await fetch(`${API_URL}/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao criar aluno");
  return res.json();
}

export async function updateStudent(id: number, data: StudentPayload) {
  const res = await fetch(`${API_URL}/students/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao atualizar aluno");
  return res.json();
}

export async function deleteStudent(id: number) {
  const res = await fetch(`${API_URL}/students/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Erro ao deletar aluno");
}