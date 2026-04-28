import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { StudentsChart } from "../components/Students";

type DashboardData = {
  totalStudents: number;
  newStudents: number;
  revenue: number;
  growth: number;
  positiveFeedback: number;
  negativeFeedback: number;
};

export function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:3000/dashboard");
      const json = await res.json();
      setData(json);
    }

    fetchData();
  }, []);

  if (!data) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card title="Total Alunos" value={String(data.totalStudents)} />
        <Card title="Novos no mês" value={String(data.newStudents)} />
        <Card title="Receita" value={`R$ ${data.revenue}`} />
        <Card title="Crescimento" value={`+${data.growth}%`} />
        <Card title="Feedback Positivo" value={`${data.positiveFeedback}%`} />
        <Card title="Feedback Negativo" value={`${data.negativeFeedback}%`} />
      </div>

      <div className="mt-6">
        <StudentsChart />
      </div>
    </div>
  );
}
