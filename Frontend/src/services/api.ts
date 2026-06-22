import { API_ENDPOINTS } from '../config/constants';

type StudentPayload = Record<string, unknown>;

export async function apiFetch(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");
  console.log("TOKEN:", token);

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

export async function getStudents(
  page = 1,
  search = ""
) {
  const params = new URLSearchParams({
    page: String(page),
    search,
  });

  const res = await apiFetch(
    `${API_ENDPOINTS.STUDENTS}?${params.toString()}`
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar alunos");
  }

  return res.json();
}

export async function createStudent(data: StudentPayload) {

  const res = await apiFetch(API_ENDPOINTS.STUDENTS, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao criar aluno");

  return res.json();
}

export async function updateStudent(id: number, data: StudentPayload) {
  const res = await apiFetch(API_ENDPOINTS.STUDENT(id), {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao atualizar aluno");
  return res.json();
}

export async function deleteStudent(id: number) {
  const res = await apiFetch(API_ENDPOINTS.STUDENT(id), {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Erro ao deletar aluno");
}