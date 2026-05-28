import { useEffect, useState } from "react";

type DashboardData = {
  totalStudents: number;
  newStudents: number;
  revenue: number;
  growth: number;
  positiveFeedback: number;
  negativeFeedback: number;
};

export function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchDashboard() {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://workout-flow.onrender.com/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Erro ao buscar dashboard");
      }

      const json = await res.json();
      setData(json);

    } catch (err) {
      console.error(err);
      setError("Erro ao carregar dashboard");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboard();
  }, []);

  return {
    data,
    loading,
    error,
    refresh: fetchDashboard,
  };
}