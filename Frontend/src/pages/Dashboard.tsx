import { Card } from "../components/Card";
import { StudentsChart } from "../components/StudentsChart";
import { useDashboard } from "../hooks/useDashboard";

export function Dashboard() {
  const { data, loading, error } = useDashboard();

  if (loading) {
    return <div className="text-white">Carregando dashboard...</div>;
  }

  if (error || !data) {
    return (
      <div className="text-red-400">
        Erro ao carregar dashboard
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card title="Total Alunos" value={data.totalStudents} />
        <Card title="Novos no mês" value={data.newStudents} />
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