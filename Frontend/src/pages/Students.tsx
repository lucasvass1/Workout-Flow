import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { type Student } from "../types/students";

import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../services/api.ts";

import { useForm, type SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { studentSchema } from "../Schemas/StudentsSchema";

import type { StudentFormData } from "../Schemas/StudentsSchema";
import { useDashboardRefresh } from "../context/DashboardContext";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

function Modal({
  isOpen,
  onClose,
  children,
}: ModalProps) {
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
  const [students, setStudents] =
    useState<Student[]>([]);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [page, setPage] =
    useState(1);

  const [search, setSearch] =
    useState("");

  const navigate = useNavigate();
  const { refresh } = useDashboardRefresh();

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      toast.error(
        "Faça login novamente"
      );

      navigate("/login");

      return;
    }

    async function fetchStudents() {
      try {
        const data =
          await getStudents(
            page,
            search
          );

        if (
          Array.isArray(
            data.students
          )
        ) {
          setStudents(data.students);

        } else {
          setStudents([]);
        }

      } catch (err) {
        console.log(
          "Erro ao buscar alunos:",
          err
        );

        setStudents([]);

        toast.error(
          "Erro ao buscar alunos"
        );
      }
    }

    fetchStudents();
  }, [navigate, page, search]);

  const {
  register,
  handleSubmit,
  reset,
  setValue,
  formState: { errors },
} = useForm<StudentFormData>({
  resolver: zodResolver(studentSchema),

  defaultValues: {
    name: "",
    age: 0,
    plan: "",
    joinedAt: "",
    isActive: true,
  },
});

  async function handleDelete(
    id: number
  ) {
    try {
      await deleteStudent(id);

      const updated =
        await getStudents(
          page,
          search
        );

      if (
        Array.isArray(
          updated.students
        )
      ) {
        setStudents(updated.students);
      }

      refresh();

      toast.success(
        "Aluno removido com sucesso"
      );

    } catch (err) {
      console.log(
        "Erro ao deletar aluno:",
        err
      );

      toast.error(
        "Erro ao deletar aluno"
      );
    }
  }

 const onSubmit: SubmitHandler<StudentFormData> = async (
  data
) => {
  console.log("FORM DATA:", data);
  console.log("isActive:", data.isActive);
  console.log("typeof:", typeof data.isActive);
    
    try {
      if (editingId !== null) {
        await updateStudent(
          editingId,
          data
        );

        toast.success(
          "Aluno atualizado com sucesso"
        );

      } else {
        await createStudent(data);

        toast.success(
          "Aluno criado com sucesso"
        );
      }

      const updated =
        await getStudents(
          page,
          search
        );

      if (
        Array.isArray(
          updated.students
        )
      ) {
        setStudents(updated.students);
      }

      refresh();

      reset();

      setEditingId(null);

      setIsModalOpen(false);

    } catch (err) {
      console.log(
        "Erro ao salvar aluno:",
        err
      );

      toast.error(
        "Erro ao salvar aluno"
      );
    }
  };

  function handleEdit(
    student: Student
  ) {
    setEditingId(Number(student.id));

    setIsModalOpen(true);

    setValue(
      "name",
      student.name
    );

    setValue(
      "age",
      student.age
    );

    setValue(
      "plan",
      student.plan
    );
    setValue(
      "joinedAt",
      student.joinedAt?.split("T")[0] ?? ""
    );

    setValue(
      "isActive",
      student.isActive
    );
  }

  function handleCloseModal() {
    setIsModalOpen(false);

    setEditingId(null);

    reset();
  }

  return (
    <div className="flex flex-col gap-6">
      <Toaster position="top-right" />

      <h1 className="text-3xl font-bold">
        Alunos
      </h1>

      <input
        type="text"
        placeholder="Buscar aluno..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);

          setPage(1);
        }}
        className="rounded bg-gray-800 p-2 text-white"
      />

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

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      >
        <h2 className="mb-4 text-xl font-bold">
          {editingId
            ? "Editar aluno"
            : "Novo aluno"}
        </h2>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="flex flex-col gap-3"
        >
          <input
            {...register("name")}
            placeholder="Nome"
            className="rounded bg-gray-700 p-2 text-white"
          />

          {errors.name && (
            <span className="text-sm text-red-400">
              {
                String(errors.name.message)
              }
            </span>
          )}

          <input
            type="number"
            {...register("age", {
              valueAsNumber: true,
            })}
            placeholder="Idade"
            className="rounded bg-gray-700 p-2 text-white"
          />

          {errors.age && (
            <span className="text-sm text-red-400">
              {
                String(errors.age.message)
              }
            </span>
          )}

          <select
            {...register("plan")}
            className="rounded bg-gray-700 p-2 text-white"
          >
            <option value="">Selecione um plano</option>

            <option value="Básico">Básico</option>

            <option value="Intermediário">Intermediário</option>

            <option value="Avançado">Avançado</option>
          </select>

          <input
            type="date"
            {...register("joinedAt")}
            className="rounded bg-gray-700 p-2 text-white"
          />

<select
  {...register("isActive", {
    setValueAs: (value) => value === "true",
  })}
  className="rounded bg-gray-700 p-2 text-white"
>
  <option value="true">Ativo</option>
  <option value="false">Inativo</option>
</select>

          {errors.plan && (
            <span className="text-sm text-red-400">
              {
                String(errors.plan.message)
              }
            </span>
          )}

          <button className="mt-2 rounded bg-blue-600 py-2">
            {editingId
              ? "Atualizar"
              : "Cadastrar"}
          </button>
        </form>
      </Modal>

      <div className="rounded-xl bg-gray-800 p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700 text-gray-400">
              <th className="py-2">
                Nome
              </th>

              <th>Idade</th>

              <th>Plano</th>

<th>Status</th>

<th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {students.length > 0 ? (
              students.map(
                (student) => (
                  <tr
                    key={student.id}
                    className="border-b border-gray-700"
                  >
                    <td className="py-2">
                      {student.name}
                    </td>

                    <td>
                      {student.age}
                    </td>

                    <td>{student.plan}</td>

                    <td>
                      {student.isActive ? "Ativo" : "Inativo"}
                    </td>

                    <td className="flex gap-2">
                      <button
                        onClick={() =>
                          handleEdit(
                            student
                          )
                        }
                        className="text-blue-400 hover:text-blue-600"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            Number(student.id)
                          )
                        }
                        className="text-red-400 hover:text-red-600"
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="py-4 text-center text-gray-400"
                >
                  Nenhum aluno
                  encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          disabled={page === 1}
          onClick={() =>
            setPage(page - 1)
          }
          className="rounded bg-gray-700 px-4 py-2 disabled:opacity-50"
        >
          Anterior
        </button>

        <span>
          Página {page}
        </span>

        <button
          onClick={() =>
            setPage(page + 1)
          }
          className="rounded bg-gray-700 px-4 py-2"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}