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
import DetalleReserva from "./pages/DetalleReserva";
import MiClub from "./pages/MiClub";
import Perfil from "./pages/Perfil";
import NotFoundPage from "./pages/NotFoundPage";
import Home from "./pages/Home";
import Reservar from "./pages/Reservar";
import ClubManagement from "./pages/Club/Management";
import EditOrCreateClub from "./pages/Club/EditOrCreate";
import EditOrCreateField from "./pages/Field/EditOrCreate";
import BackGround from "./pages/Reservar/background";
import FindFields from "./pages/FindFields";

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
          <Route path="/reserva" element={<BackGround />}>
              <Route path="/reserva/:bookingId" element={<Reservar />} />
              <Route path="/reserva/callback/preference" element={<DetalleReserva />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Navigate to="home" />} />
              <Route path="home" element={<Home />} />
              <Route path="misReservas" element={<MisReservas />} />
              <Route path="findField" element={<FindFields />} />
              <Route path="detalleReserva/:bookingId" element={<DetalleReserva />} />
              <Route path="miClub" element={<MiClub />} />
              <Route path="/dashboard/miClub/new" element={<EditOrCreateClub />} />
              <Route path="/dashboard/miClub/:clubId" element={<ClubManagement />} />
              <Route path="/dashboard/miClub/:clubId/edit" element={<EditOrCreateClub editMode={true} />} />
              <Route path="/dashboard/miClub/:clubId/fields" element={<EditOrCreateField />} />
              <Route path="/dashboard/miClub/:clubId/fields/:fieldId" element={<EditOrCreateField editMode={true} />} />
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
