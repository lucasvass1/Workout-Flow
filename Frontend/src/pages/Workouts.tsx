import { useEffect, useState } from "react";
import { getWorkouts, createWorkout, deleteWorkout } from "../services/workouts";

type Workout = {
  id: number;
  name: string;
  student: {
    name: string;
  };
};

type Student = {
  id: number;
  name: string;
};

export function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");

  useEffect(() => {
    async function fetchData() {
      const workoutsData = await getWorkouts();

      const res = await fetch("http://localhost:3000/students");
      const studentsData = await res.json();

      setWorkouts(workoutsData);
      setStudents(studentsData);
    }

    fetchData();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await createWorkout({
      name,
      studentId: Number(studentId),
    });

    setName("");
    setStudentId("");

    const data = await getWorkouts();
    setWorkouts(data);
  }

  async function handleDelete(id: number) {
    await deleteWorkout(id);
    const data = await getWorkouts();
    setWorkouts(data);
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Treinos</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          placeholder="Nome do treino"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-700 p-2 rounded"
        />

        <select
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="bg-gray-700 p-2 rounded"
        >
          <option value="">Selecione um aluno</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <button type="submit" className="bg-blue-500 p-2 rounded">
          Criar Treino
        </button>
      </form>

      <div className="bg-gray-800 p-4 rounded-xl">
        {workouts.map((w) => (
          <div key={w.id} className="flex justify-between border-b py-2">
            <span>
              {w.name} - {w.student.name}
            </span>
            <button
              onClick={() => handleDelete(w.id)}
              className="bg-red-500 p-1 rounded"
            >
              Deletar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}