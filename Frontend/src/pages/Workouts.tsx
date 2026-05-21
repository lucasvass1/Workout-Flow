import { useEffect, useState } from "react";
import {
  getWorkouts,
  createWorkout,
  deleteWorkout,
} from "../services/workouts";

import { BASE_URL } from "../services/api/config";

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
      try {
        const token = localStorage.getItem("token");

        const workoutsData = await getWorkouts();

        const res = await fetch(`${BASE_URL}/students`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Erro ao buscar alunos");
        }

        const studentsData = await res.json();

        setWorkouts(
          Array.isArray(workoutsData)
            ? workoutsData
            : []
        );

        // CORREÇÃO AQUI
        setStudents(
          Array.isArray(studentsData.students)
            ? studentsData.students
            : []
        );

      } catch (error) {
        console.error(error);
        setStudents([]);
        setWorkouts([]);
      }
    }

    fetchData();
  }, []);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    // VALIDAÇÃO
    if (!studentId) {
      alert("Selecione um aluno");
      return;
    }

    try {
      await createWorkout({
        name,
        studentId: Number(studentId),
      });

      setName("");
      setStudentId("");

      const data = await getWorkouts();

      setWorkouts(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteWorkout(id);

      const data = await getWorkouts();

      setWorkouts(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col gap-6 min-w-0">
      <h1 className="text-2xl font-bold">
        Treinos
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <input
          placeholder="Nome do treino"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="bg-gray-700 p-2 rounded"
        />

        <select
          value={studentId}
          onChange={(e) =>
            setStudentId(e.target.value)
          }
          className="bg-gray-700 p-2 rounded"
        >
          <option value="">
            Selecione um aluno
          </option>

          {students.map((s) => (
            <option
              key={s.id}
              value={s.id}
            >
              {s.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-500 p-2 rounded"
        >
          Criar Treino
        </button>
      </form>

      <div className="bg-gray-800 p-4 rounded-xl">
        {workouts.map((w) => (
          <div
            key={w.id}
            className="flex justify-between border-b py-2"
          >
            <span>
              {w.name} - {w.student.name}
            </span>

            <button
              onClick={() =>
                handleDelete(w.id)
              }
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