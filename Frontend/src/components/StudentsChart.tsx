import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import type { StudentGrowthPoint } from "../hooks/useDashboard";

type ChartData = {
  month: string;
  totalStudents: number;
  newStudents: number;
};

type StudentsChartProps = {
  data: StudentGrowthPoint[];
};

export function StudentsChart({ data }: StudentsChartProps) {
  const chartData: ChartData[] = data;

  return (
    <div className="w-full min-w-0 rounded-xl bg-gray-800 p-5">
      <h2 className="mb-4 text-lg text-white">
        Crescimento de alunos (12 meses)
      </h2>

      <div className="h-[300px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip
              contentStyle={{ backgroundColor: "#111827", border: "1px solid #374151" }}
              labelStyle={{ color: "#ffffff" }}
            />

            <Line
              type="monotone"
              dataKey="totalStudents"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}