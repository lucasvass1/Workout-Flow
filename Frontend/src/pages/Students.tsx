import { useEffect, useState, type ReactNode } from "react";
import { type Student } from "../types/students";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../services/api.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentSchema } from "../Schemas/StudentsSchema";
import type { StudentFormData } from "../Schemas/StudentsSchema";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-lg rounded-xl bg-gray-800 p-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-400 hover:text-white"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function loadStudents() {
      const data = await getStudents();
      setStudents(data);
    }

    loadStudents();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
  });

  async function handleDelete(id: number) {
    await deleteStudent(id);

    const updated = await getStudents();
    setStudents(updated);
  }

  async function onSubmit(data: StudentFormData) {
    if (editingId !== null) {
      await updateStudent(editingId, data);
    } else {
      await createStudent(data);
    }

    const updated = await getStudents();
    setStudents(updated);

    reset();
    setEditingId(null);
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
        className="w-fit rounded bg-green-600 px-4 py-2"
      >
        + Novo aluno
      </button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="mb-4 text-xl font-bold">
          {editingId ? "Editar aluno" : "Novo aluno"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <input
            {...register("name")}
            placeholder="Nome"
            className="rounded bg-gray-700 p-2 text-white"
          />
          {errors.name && (
            <span className="text-sm text-red-400">{errors.name.message}</span>
          )}

          <input
            type="number"
            {...register("age", { valueAsNumber: true })}
            placeholder="Idade"
            className="rounded bg-gray-700 p-2 text-white"
          />
          {errors.age && (
            <span className="text-sm text-red-400">{errors.age.message}</span>
          )}

          <input
            {...register("plan")}
            placeholder="Plano"
            className="rounded bg-gray-700 p-2 text-white"
          />
          {errors.plan && (
            <span className="text-sm text-red-400">{errors.plan.message}</span>
          )}

          <button className="mt-2 rounded bg-blue-600 py-2">
            {editingId ? "Atualizar" : "Cadastrar"}
          </button>
        </form>
      </Modal>

      <div className="rounded-xl bg-gray-800 p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700 text-gray-400">
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