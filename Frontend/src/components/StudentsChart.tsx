import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { BASE_URL } from "../services/api/config";

type StudentWorkout = {
  name: string;
  _count: {
    workouts: number;
  };
};

type DashboardResponse = {
  workoutsPerStudent: StudentWorkout[];
};

type ChartData = {
  month: string;
  alunos: number;
};

export function StudentsChart() {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${BASE_URL}/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Erro ao buscar dashboard");
        }

        const json: DashboardResponse = await res.json();

        const formatted = (json.workoutsPerStudent || []).map(
          (student) => ({
            month: student.name,
            alunos: student._count.workouts,
          })
        );

        setData(formatted);
      } catch (error) {
        console.error("Erro no gráfico:", error);
      }
    }

    load();
  }, []);

  return (
    <div className="bg-gray-800 p-5 rounded-xl w-full min-w-0">
      <h2 className="text-lg mb-4 text-white">
        Crescimento de alunos
      </h2>

      <div className="w-full min-w-0 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="month" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="alunos"
              stroke="#3b82f6"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}