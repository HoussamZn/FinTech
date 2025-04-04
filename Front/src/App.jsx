import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./assets/components/Hero/Hero";
import Settings from "./assets/components/dashboard/settings";
import Transactions from "./assets/components/dashboard/Transactions";
import './App.css'



import Dashboard from "./assets/components/dashboard/Dashboard";
import DashHome from "./assets/components/dashboard/DashHome";
import Statistics from "./assets/components/dashboard/Statistics";
import { AuthProvider } from "./assets/utils/AuthContext";
import ProtectedRoute from "./assets/utils/ProtectedRoute";


function App() {

  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route element={<ProtectedRoute />}>
          <Route path="dash/" element={<Dashboard />}>
            <Route index element={<DashHome />} />
            <Route path="statis" element={<Statistics/>} />
            <Route path="transactions" element={<Transactions/>} />
            <Route path="settings" element={<Settings/>} />
          </Route>
        </Route>
      </Routes>
    </Router>
    </AuthProvider>
  )
}

export default App
