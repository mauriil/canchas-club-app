import { Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./contexts/userContext";
import { useState } from "react";
import { useEffect } from "react";
import useScreenSize from "./customHooks/screenSize";
import "./App.css";
import LogInPage from "./components/pages/LogInPage";
import MobileLoginPage from "./components/pages/MobileLogInPage";

function App() {
  const [isLogedIn, setIsLogedIn] = useState(false);
  const screenSize = useScreenSize();
  return (
    <>
      <UserContext.Provider value={isLogedIn}>
        <Routes>
          <Route path="/" element={<Navigate to="login" />} />
          {screenSize.width > 900 ? (
            <Route path="/login" element={<LogInPage />} />
          ) : (
            <Route path="/login" element={<MobileLoginPage />} />
          )}
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
