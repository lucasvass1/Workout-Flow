type StudentPayload = Record<string, unknown>;

const API_URL = "https://workout-flow.onrender.com";

export async function apiFetch(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");

  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });
}

export function getToken() {
  return localStorage.getItem("token");
}

export async function getStudents() {
  const res = await apiFetch(`${API_URL}/students`);
  if (!res.ok) throw new Error("Erro ao buscar alunos");
  return res.json();
}

export async function createStudent(data: StudentPayload) {
  const res = await apiFetch(`${API_URL}/students`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao criar aluno");
  return res.json();
}

export async function updateStudent(id: number, data: StudentPayload) {
  const res = await apiFetch(`${API_URL}/students/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao atualizar aluno");
  return res.json();
}

export async function deleteStudent(id: number) {
  const res = await apiFetch(`${API_URL}/students/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Erro ao deletar aluno");
}