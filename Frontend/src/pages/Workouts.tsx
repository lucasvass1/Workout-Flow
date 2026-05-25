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

type Exercise = {
  id: number;
  name: string;
  sets: number;
  reps: number;
  weight: number | null;
};

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

  const [expandedWorkoutId, setExpandedWorkoutId] =
    useState<number | null>(null);

  const [exercises, setExercises] =
    useState<Exercise[]>([]);

  const [exerciseName, setExerciseName] =
    useState("");

  const [sets, setSets] =
    useState("");

  const [reps, setReps] =
    useState("");

  const [weight, setWeight] =
    useState("");

  async function refreshWorkouts() {
    try {
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

  async function handleDeleteWorkout(
    id: number
  ) {
    try {
      await deleteWorkout(id);

      await refreshWorkouts();

    } catch (error) {
      console.error(error);
    }
  }

  async function fetchExercises(
    workoutId: number
  ) {
    try {
      const token =
        localStorage.getItem("token");

      const res = await fetch(
        `${BASE_URL}/workouts/${workoutId}/exercises`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(
          "Erro ao buscar exercícios"
        );
      }

      const data = await res.json();

      setExercises(data);

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

      await fetchExercises(workoutId);
      await refreshWorkouts();

    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteExercise(
    exerciseId: number
  ) {
    try {
      await deleteExercise(exerciseId);

      if (expandedWorkoutId) {
        await fetchExercises(
          expandedWorkoutId
        );
      }

      await refreshWorkouts();

    } catch (error) {
      console.error(error);
    }
  }

  async function toggleExercises(
    workoutId: number
  ) {
    if (
      expandedWorkoutId === workoutId
    ) {
      setExpandedWorkoutId(null);
      return;
    }

    setExpandedWorkoutId(workoutId);

    await fetchExercises(workoutId);
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
          className="rounded bg-gray-700 p-2"
        />

        <select
          value={studentId}
          onChange={(e) =>
            setStudentId(e.target.value)
          }
          className="rounded bg-gray-700 p-2"
        >
          <option value="">
            Selecione um aluno
          </option>

          {students.map((student) => (
            <option
              key={student.id}
              value={student.id}
            >
              {student.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="rounded bg-blue-500 p-2"
        >
          Criar treino
        </button>
      </form>

      <div className="rounded-xl bg-gray-800 p-4">
        {workouts.map((workout) => (
          <div
            key={workout.id}
            className="border-b py-4"
          >
            <div className="flex items-center justify-between">
              <span>
                {workout.name} -{" "}
                {workout.student.name}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    toggleExercises(
                      workout.id
                    )
                  }
                  className="rounded bg-gray-700 px-3 py-1"
                >
                  {expandedWorkoutId ===
                  workout.id
                    ? "Fechar"
                    : "Ver exercícios"}
                </button>

                <button
                  onClick={() =>
                    handleDeleteWorkout(
                      workout.id
                    )
                  }
                  className="rounded bg-red-500 px-3 py-1"
                >
                  Deletar
                </button>
              </div>
            </div>

            {expandedWorkoutId ===
              workout.id && (
              <div className="mt-4 rounded bg-gray-900 p-4">
                <h3 className="mb-4 text-lg font-bold">
                  Exercícios
                </h3>

                <div className="mb-4 flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Nome exercício"
                    value={exerciseName}
                    onChange={(e) =>
                      setExerciseName(
                        e.target.value
                      )
                    }
                    className="rounded bg-gray-700 p-2"
                  />

                  <input
                    type="number"
                    placeholder="Séries"
                    value={sets}
                    onChange={(e) =>
                      setSets(
                        e.target.value
                      )
                    }
                    className="rounded bg-gray-700 p-2"
                  />

                  <input
                    type="number"
                    placeholder="Repetições"
                    value={reps}
                    onChange={(e) =>
                      setReps(
                        e.target.value
                      )
                    }
                    className="rounded bg-gray-700 p-2"
                  />

                  <input
                    type="number"
                    placeholder="Carga"
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
                        workout.id
                      )
                    }
                    className="rounded bg-green-600 p-2"
                  >
                    Adicionar exercício
                  </button>
                </div>

                {exercises.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {exercises.map(
                      (exercise) => (
                        <div
                          key={exercise.id}
                          className="rounded bg-gray-800 p-3"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold">
                                {
                                  exercise.name
                                }
                              </p>

                              <p className="text-sm text-gray-400">
                                {
                                  exercise.sets
                                }
                                x
                                {
                                  exercise.reps
                                }
                              </p>

                              <p className="text-sm text-gray-400">
                                {exercise.weight ??
                                  0}
                                kg
                              </p>
                            </div>

                            <button
                              onClick={() =>
                                handleDeleteExercise(
                                  exercise.id
                                )
                              }
                              className="rounded bg-red-600 px-3 py-1"
                            >
                              Excluir
                            </button>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-gray-400">
                    Nenhum exercício
                    cadastrado
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}