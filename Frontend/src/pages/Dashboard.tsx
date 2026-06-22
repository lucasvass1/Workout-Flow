import { Card } from "../components/Card";
import { StudentsChart } from "../components/StudentsChart";
import { useDashboard } from "../hooks/useDashboard";
import { formatCurrency, formatPercentage } from "../config/constants";

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

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Receita Mensal" value={formatCurrency(data.revenue)} />
        <Card title="Crescimento Mensal" value={formatPercentage(data.growth)} />
        <Card title="Total de Alunos" value={data.totalStudents} />
        <Card title="Alunos Ativos" value={data.activeStudents} />
        <Card title="Alunos Inativos" value={data.inactiveStudents} />
        <Card title="Novos no Mês" value={data.newStudents} />
        <Card title="Total de Treinos" value={data.totalWorkouts} />
        <Card title="Taxa de Ativos" value={formatPercentage(data.activeRate)} />
      </div>

      <div className="mt-6">
        <StudentsChart data={data.studentGrowth} />
      </div>
    </div>
  );
}