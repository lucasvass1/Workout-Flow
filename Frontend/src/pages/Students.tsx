import { useState, type ReactNode } from "react";
import { type Student } from "../types/students";
import { students as initialStudents } from "../services/students";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentSchema } from "../Schemas/StudentsSchema";
import type { StudentFormData } from "../Schemas/StudentsSchema";
import toast from "react-hot-toast";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-gray-800 p-6 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export function Students() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    toast.success("Aluno excluído com sucesso!");
  }

  function onSubmit(data: StudentFormData) {
    if (editingId !== null) {
      setStudents((prev) =>
        prev.map((student) =>
          student.id === editingId ? { ...student, ...data } : student
        )
      );
      toast.success("Aluno atualizado com sucesso");
      setEditingId(null);
    } else {
      setStudents((prev) => {
        const nextId =
          prev.length > 0
            ? Math.max(...prev.map((student) => student.id)) + 1
            : 1;
        return [...prev, { id: nextId, ...data }];
      });
      toast.success("Aluno criado com sucesso");
    }

    reset();
    setIsModalOpen(false);
  }

  function handleEdit(student: Student) {
    setEditingId(student.id);
    setIsModalOpen(true);
    setValue("name", student.name);
    setValue("age", student.age);
    setValue("plan", student.plan);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setEditingId(null);
    reset();
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Alunos</h1>

      <button
        onClick={() => {
          setIsModalOpen(true);
          setEditingId(null);
          reset();
        }}
        className="bg-green-600 px-4 py-2 rounded w-fit"
      >
        + Novo aluno
      </button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-xl font-bold mb-4">
          {editingId ? "Editar aluno" : "Novo aluno"}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
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

          <button className="bg-blue-600 py-2 rounded mt-2">
            {editingId ? "Atualizar" : "Cadastrar"}
          </button>
        </form>
      </Modal>

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