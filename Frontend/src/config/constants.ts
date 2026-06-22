
const API_URL = import.meta.env.VITE_API_URL || 'https://workout-flow.onrender.com';

export const API_ENDPOINTS = {
  DASHBOARD: `${API_URL}/dashboard`,
  STUDENTS: `${API_URL}/students`,
  WORKOUTS: `${API_URL}/workouts`,
  AUTH_LOGIN: `${API_URL}/auth/login`,
  AUTH_REGISTER: `${API_URL}/auth/register`,
  EXERCISES: (workoutId: number) => `${API_URL}/workouts/${workoutId}/exercises`,
  EXERCISE: (id: number) => `${API_URL}/exercises/${id}`,
  WORKOUT: (id: number) => `${API_URL}/workouts/${id}`,
  STUDENT: (id: number) => `${API_URL}/students/${id}`,
};

export const PLAN_PRICES = {
  'Básico': 89.90,
  'Intermediário': 119.90,
  'Avançado': 149.90,
} as const;

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}
