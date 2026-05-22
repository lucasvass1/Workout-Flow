import { useEffect, useState } from "react";

import {
  getWorkouts,
  createWorkout,
  deleteWorkout,
} from "../services/workouts";

import {
  createExercise,
  deleteExercise,
} from "../services/exercises";

import { BASE_URL } from "../services/api/config";

import type { Exercise } from "../types/exercise";

type Workout = {
  id: number;

  name: string;

  student: {
    name: string;
  };

  exercises?: Exercise[];
};

type Student = {
  id: number;
  name: string;
};

export function Workouts() {
  const [workouts, setWorkouts] =
    useState<Workout[]>([]);

  const [students, setStudents] =
    useState<Student[]>([]);

  const [name, setName] =
    useState("");

  const [studentId, setStudentId] =
    useState("");

  const [exerciseName, setExerciseName] =
    useState("");

  const [sets, setSets] =
    useState("");

  const [reps, setReps] =
    useState("");

  const [weight, setWeight] =
    useState("");

  async function refreshWorkouts() {
    const data = await getWorkouts();

    setWorkouts(
      Array.isArray(data)
        ? data
        : []
    );
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const token =
          localStorage.getItem("token");

        const workoutsData =
          await getWorkouts();

        const res = await fetch(
          `${BASE_URL}/students`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error(
            "Erro ao buscar alunos"
          );
        }

        const studentsData =
          await res.json();

        setWorkouts(
          Array.isArray(workoutsData)
            ? workoutsData
            : []
        );

        setStudents(
          Array.isArray(
            studentsData.students
          )
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

      await refreshWorkouts();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteWorkout(id);

      await refreshWorkouts();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCreateExercise(
    workoutId: number
  ) {
    try {
      await createExercise(
        workoutId,
        {
          name: exerciseName,

          sets: Number(sets),

          reps: Number(reps),

          weight: weight
            ? Number(weight)
            : null,
        }
      );

      setExerciseName("");
      setSets("");
      setReps("");
      setWeight("");

      await refreshWorkouts();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteExercise(
    id: number
  ) {
    try {
      await deleteExercise(id);

      await refreshWorkouts();
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
          Criar treino
        </button>
      </form>

      <div className="bg-gray-800 p-4 rounded-xl">
        {workouts.map((w) => (
          <div
            key={w.id}
            className="border-b py-4"
          >
            <div className="flex justify-between">
              <span>
                {w.name} -{" "}
                {w.student.name}
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

            <div className="mt-4 flex flex-col gap-2">
              <input
                placeholder="Exercício"
                value={exerciseName}
                onChange={(e) =>
                  setExerciseName(
                    e.target.value
                  )
                }
                className="rounded bg-gray-700 p-2"
              />

              <input
                placeholder="Séries"
                value={sets}
                onChange={(e) =>
                  setSets(e.target.value)
                }
                className="rounded bg-gray-700 p-2"
              />

              <input
                placeholder="Repetições"
                value={reps}
                onChange={(e) =>
                  setReps(e.target.value)
                }
                className="rounded bg-gray-700 p-2"
              />

              <input
                placeholder="Peso"
                value={weight}
                onChange={(e) =>
                  setWeight(
                    e.target.value
                  )
                }
                className="rounded bg-gray-700 p-2"
              />

              <button
                onClick={() =>
                  handleCreateExercise(
                    w.id
                  )
                }
                className="rounded bg-green-600 p-2"
              >
                Adicionar exercício
              </button>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              {w.exercises?.map(
                (exercise) => (
                  <div
                    key={exercise.id}
                    className="rounded bg-gray-700 p-3"
                  >
                    <div className="font-bold">
                      {exercise.name}
                    </div>

                    <div>
                      {exercise.sets}x
                      {exercise.reps}
                    </div>

                    <div>
                      {exercise.weight ??
                        0}
                      kg
                    </div>

                    <button
                      onClick={() =>
                        handleDeleteExercise(
                          exercise.id
                        )
                      }
                      className="mt-2 rounded bg-red-500 px-2 py-1"
                    >
                      Remover
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}