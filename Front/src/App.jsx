import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./assets/components/Hero/Hero";
import Settings from "./assets/components/dashboard/settings";
import Account from "./assets/components/dashboard/Account";
import Transactions from "./assets/components/dashboard/Transactions";
import './App.css'
import { useEffect } from "react";


import Dashboard from "./assets/components/dashboard/Dashboard";
import DashHome from "./assets/components/dashboard/DashHome";
import Statistics from "./assets/components/dashboard/Statistics";
import { AuthProvider } from "./assets/utils/AuthContext";
import ProtectedRoute from "./assets/utils/ProtectedRoute";


function App() {  
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      document.documentElement.classList.toggle('dark', savedMode === 'true');
    }else{
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', systemPrefersDark);
    }
  }, []);

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
            <Route path="Account" element={<Account/>} />
          </Route>
        </Route>
      </Routes>
    </Router>
    </AuthProvider>
  )
}

export default App
