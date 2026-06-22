import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../config/constants";
import { useDashboardRefreshVersion } from "../context/DashboardContext";

export type StudentGrowthPoint = {
  month: string;
  newStudents: number;
  totalStudents: number;
};

type DashboardData = {
  totalStudents: number;
  newStudents: number;
  totalWorkouts: number;
  activeStudents: number;
  inactiveStudents: number;
  revenue: number;
  growth: number;
  activeRate: number;
  plansCount: {
    basico: number;
    intermediario: number;
    avancado: number;
  };
  studentGrowth: StudentGrowthPoint[];
};

export function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const refreshVersion = useDashboardRefreshVersion();

  async function fetchDashboard() {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

     
      const res = await fetch(API_ENDPOINTS.DASHBOARD, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
  }, [refreshVersion]);

  return {
    data,
    loading,
    error,
    refresh: fetchDashboard,
  };
}