import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", alunos: 20 },
  { month: "Fev", alunos: 35 },
  { month: "Mar", alunos: 50 },
  { month: "Abr", alunos: 65 },
  { month: "Mai", alunos: 80 },
];

export function StudentsChart() {
  return (
    <div className="bg-gray-800 p-5 rounded-xl">
      <h2 className="text-lg mb-4">Crescimento de alunos</h2>

      <div className="w-full h-64">
        <ResponsiveContainer>
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="alunos" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}