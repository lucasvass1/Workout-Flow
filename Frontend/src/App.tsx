import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { MainLayout } from "./layouts/mainlayout";
import { Dashboard } from "./pages/Dashboard";
import { Students } from "./pages/Students";
import { Workouts } from "./pages/Workouts";
import { Login } from "./pages/Login";
import { PrivateRoute } from "./routes/PrivateRoute";
import { Register } from "./pages/Register";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* rota inicial */}
        <Route
          path="/"
          element={
            token ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* protegidas */}
        <Route element={<MainLayout />}>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/students"
            element={
              <PrivateRoute>
                <Students />
              </PrivateRoute>
            }
          />

          <Route
            path="/workouts"
            element={
              <PrivateRoute>
                <Workouts />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;