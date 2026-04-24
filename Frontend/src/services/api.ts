type StudentPayload = Record<string, unknown>;

export async function getStudents() {
  const res = await fetch("http://localhost:3000/students");
  return res.json();
}

export async function createStudent(data: StudentPayload) {
  const res = await fetch("http://localhost:3000/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function updateStudent(id: number, data: StudentPayload) {
  const res = await fetch(`http://localhost:3000/students/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function deleteStudent(id: number) {
  await fetch(`http://localhost:3000/students/${id}`, {
    method: "DELETE",
  });
}