import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ButtonEntrar } from "../components/ButtonEntrar";
export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch( "https://workout-flow.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Credenciais inválidas");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);

      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-xl">
        
        {/* HEADER */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white">Bem-vindo de volta</h1>
          <p className="text-sm text-gray-400">
            Entre com sua conta para continuar
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* FORM */}
        <div className="flex flex-col gap-4">
          <div>
            <input
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-800 bg-gray-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <input
              placeholder="Senha"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-800 bg-gray-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

        <ButtonEntrar onClick={handleLogin} loading={loading} />
          <p className="text-gray-400 mt-4 text-center">
  Não possui conta?{" "}
  <Link
    to="/register"
    className="text-blue-500 hover:underline"
  >
    Criar conta
  </Link>
</p>
        </div>

        {/* FOOTER */}
        <p className="mt-6 text-center text-xs text-gray-500">
          Sistema protegido • acesso restrito
        </p>
      </div>
    </div>
  );
}