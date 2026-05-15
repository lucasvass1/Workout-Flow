import { apiFetch } from "./api";

type StudentPayload = Record<string, unknown>;

export async function getStudents(
  page = 1,
  search = ""
) {
  const res = await apiFetch(
    `https://workout-flow.onrender.com/students?page=${page}&search=${search}`
  );

  return res.json();
}

export async function createStudent(data: StudentPayload) {
  const res = await apiFetch("https://workout-flow.onrender.com/students", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao criar aluno");
  return res.json();
}

export async function updateStudent(id: number, data: StudentPayload) {
  const res = await apiFetch(`https://workout-flow.onrender.com/students/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao atualizar aluno");
  return res.json();
}

export async function deleteStudent(id: number) {
  const res = await apiFetch(`https://workout-flow.onrender.com/students/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Erro ao deletar aluno");
}