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
import Settings from "./pages/Settings";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="index" />} />
          <Route path="/index" element={<LogInPage />}>
            <Route index element={<Navigate to="logIn" />} />
            <Route path="logIn" element={<LogIn />} />
            <Route path="signIn" element={<SignIn />} />
            <Route path="forgotPassword" element={<ForgotPassword />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Navigate to="misReservas" />} />
              <Route path="misReservas" element={<MisReservas />} />
              <Route path="miClub" element={<MiClub />} />
              <Route path="configuraciones" element={<Settings />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
