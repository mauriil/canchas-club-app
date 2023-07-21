import { Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./contexts/userContext";
import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import LogInPage from "./pages/LogInPage";
import LogIn from "./components/Login";
import SignIn from "./components/SignIn";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  const [isLogedIn, setIsLogedIn] = useState(false);
  return (
    <>
      <UserContext.Provider value={isLogedIn}>
        <Routes>
          <Route path="/" element={<Navigate to="index" />} />
          <Route path="/index" element={<LogInPage />}>
            <Route index element={<Navigate to="logIn" />} />
            <Route path="logIn" element={<LogIn />} />
            <Route path="signIn" element={<SignIn />} />
            <Route path="forgotPassword" element={<ForgotPassword />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
