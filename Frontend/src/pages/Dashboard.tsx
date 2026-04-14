import { Card } from "../components/Card";

export function Dashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <Card title="Total Alunos" value="120" />
                <Card title="Novos no mês" value="85" />
                <Card title="Receita" value="R$ 4.500" />
                <Card title="Crescimento" value="+12%" />
                <Card title="Feedback Positivo" value="89%" />
                <Card title="Feedback Negativo" value="11%" />
            </div>
        </div>
    );
}