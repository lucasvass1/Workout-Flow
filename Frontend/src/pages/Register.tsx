import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch(
      "https://workout-flow.onrender.com/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    if (!res.ok) {
      alert("Erro ao cadastrar");
      return;
    }

    alert("Conta criada com sucesso");

    navigate("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <form
        onSubmit={handleRegister}
        className="bg-gray-900 p-8 rounded-xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-white">
          Criar conta
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-gray-800 text-white mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full p-3 rounded bg-gray-800 text-white mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded text-white font-bold"
        >
          Criar conta
        </button>
      </form>
    </div>
  );
}