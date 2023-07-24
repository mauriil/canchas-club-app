import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import LogInPage from "./pages/LogInPage";
import Dashboard from "./pages/Dashboard";
import LogIn from "./components/Login";
import SignIn from "./components/SignIn";
import ForgotPassword from "./components/ForgotPassword";
import { AuthProvider } from "./contexts/userContext";

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
          </Route>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
