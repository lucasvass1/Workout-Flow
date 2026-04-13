import { BrowserRouter , Routes , Route } from "react-router-dom";
import { MainLayout } from "./layouts/mainlayout";
import { Dashboard } from "./pages/Dashboard";
import { Students } from "./pages/Students";
import { Workouts } from "./pages/Workouts";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;