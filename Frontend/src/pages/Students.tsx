import { useState } from "react";
import { type Student } from "../types/students";
import { students as initialStudents } from "../services/students";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentSchema} from "../Schemas/StudentsSchema";
import type { StudentFormData } from "../Schemas/StudentsSchema";

export function Students() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [editingId, setEditingId] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
  });

  function handleDelete(id: number) {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  }

  function onSubmit(data: StudentFormData) {
    if (editingId !== null) {
      setStudents((prev) =>
        prev.map((student) =>
          student.id === editingId ? { ...student, ...data } : student
        )
      );
      setEditingId(null);
    } else {
      setStudents((prev) => {
        const nextId =
          prev.length > 0 ? Math.max(...prev.map((student) => student.id)) + 1 : 1;
        const newStudent: Student = {
          id: nextId,
          ...data,
        };
        return [...prev, newStudent];
      });
    }

    reset();
  }

  function handleEdit(student: Student) {
    setEditingId(student.id);

    // preenche o formulário
    setValue("name", student.name);
    setValue("age", student.age);
    setValue("plan", student.plan);
  }

  function handleCancelEdit() {
    setEditingId(null);
    reset();
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Alunos</h1>

      
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-4 rounded-xl flex gap-3 items-start"
      >
        <div className="flex flex-col">
          <input
            {...register("name")}
            placeholder="Nome"
            className="bg-gray-700 p-2 rounded text-white"
          />
          {errors.name && (
            <span className="text-red-400 text-sm">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <input
            type="number"
            {...register("age", { valueAsNumber: true })}
            placeholder="Idade"
            className="bg-gray-700 p-2 rounded text-white"
          />
          {errors.age && (
            <span className="text-red-400 text-sm">
              {errors.age.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <input
            {...register("plan")}
            placeholder="Plano"
            className="bg-gray-700 p-2 rounded text-white"
          />
          {errors.plan && (
            <span className="text-red-400 text-sm">
              {errors.plan.message}
            </span>
          )}
        </div>

        <button className="bg-blue-600 px-4 py-2 rounded h-fit">
          {editingId !== null ? "Atualizar" : "Adicionar"}
        </button>

        {editingId !== null && (
          <button
            type="button"
            onClick={handleCancelEdit}
            className="bg-gray-600 px-4 py-2 rounded h-fit"
          >
            Cancelar
          </button>
        )}
      </form>

      
      <div className="bg-gray-800 p-4 rounded-xl">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="py-2">Nome</th>
              <th>Idade</th>
              <th>Plano</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b border-gray-700">
                <td className="py-2">{student.name}</td>
                <td>{student.age}</td>
                <td>{student.plan}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleEdit(student)}
                    className="text-blue-400 hover:text-blue-600"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(student.id)}
                    className="text-red-400 hover:text-red-600"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}