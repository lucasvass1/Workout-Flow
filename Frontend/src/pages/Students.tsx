import { useState } from "react";
import { type Student } from "../types/students";
import { students as initialStudents } from "../services/students";

export function Students() {
  const [students, setStudents] = useState<Student[]>(initialStudents);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [plan, setPlan] = useState("");

  function handleDelete(id: number) {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  }

  function handleAddStudent(e: React.FormEvent) {
    e.preventDefault();

    const newStudent: Student = {
      id: Date.now(),
      name,
      age: Number(age),
      plan,
    };

    setStudents((prev) => [...prev, newStudent]);

    setName("");
    setAge("");
    setPlan("");
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Alunos</h1>

      {/* Formulário */}
      <form
        onSubmit={handleAddStudent}
        className="bg-gray-800 p-4 rounded-xl flex gap-3"
      >
        <input
          className="bg-gray-700 p-2 rounded text-white"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="bg-gray-700 p-2 rounded text-white"
          placeholder="Idade"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <input
          className="bg-gray-700 p-2 rounded text-white"
          placeholder="Plano"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
        />

        <button className="bg-blue-600 px-4 rounded">
          Adicionar
        </button>
      </form>

      {/* Tabela */}
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
                <td>
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