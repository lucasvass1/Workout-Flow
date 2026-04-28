import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

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
      const res = await fetch("http://localhost:3000/dashboard");
      const json: DashboardResponse = await res.json();

      const formatted = json.workoutsPerStudent.map((student) => ({
        month: student.name,
        alunos: student._count.workouts,
      }));

      setData(formatted);
    }

    load();
  }, []);

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