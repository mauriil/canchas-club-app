import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import LogInPage from "./pages/LogInPage";
import Dashboard from "./pages/Dashboard";
import LogIn from "./components/Login";
import SignIn from "./components/SignIn";
import ForgotPassword from "./components/ForgotPassword";
import { AuthProvider } from "./contexts/userContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MisReservas from "./pages/MisReservas";
import MiClub from "./pages/MiClub";
import Perfil from "./pages/Perfil";
import NotFoundPage from "./pages/NotFoundPage";
import Home from "./pages/Home";
import ClubManagement from "./pages/Club/Management";
import CreateClub from "./pages/Club/New";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="index" />} />
          <Route path="/index" element={<LogInPage />}>
            <Route index element={<Navigate to="logIn" />} />
            <Route path="logIn" element={<LogIn />} />
            <Route path="signUp" element={<SignIn />} />
            <Route path="forgotPassword" element={<ForgotPassword />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Navigate to="home" />} />
              <Route path="home" element={<Home />} />
              <Route path="misReservas" element={<MisReservas />} />
              <Route path="miClub" element={<MiClub />} />
              <Route path="/dashboard/miClub/new" element={<CreateClub />} />
              <Route path="/dashboard/miClub/:clubId" element={<ClubManagement />} />
              <Route path="miPerfil" element={<Perfil />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
