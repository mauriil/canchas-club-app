/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createContext, useEffect, useState } from "react";
import { registerRequest, logInRequest, verifyTokenRequest, forgotPasswordRequest } from "../api/auth";
import Cookies from "js-cookie";
import { ForgotPasswordRequestBody, ForgotPasswordResponse, LogInUser, LoginResponse, SigningResponse, User, UserResp } from "../types/users";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextType {
  signUp: (user: User) => Promise<{status: boolean, errors: string[]}>;
  signIn: (user: LogInUser) => Promise<{status: boolean, errors: string[]}>;
  forgotPassword: (user: ForgotPasswordRequestBody) => Promise<boolean>;
  user: UserResp | null;
  isAuthenticated: boolean;
  errors: string[];
}
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{
    userName: string;
    userId: string;
  } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const signUp = async (user: User): Promise<{status: boolean, errors: string[]}> => {
    const res = await registerRequest(user);
    return await res.json().then((data: SigningResponse) => {
      console.log("DATA: ", data);
      if (data.statusCode >= 400 || data.status >= 400) {
        setErrors(data.message);
        return {status: false, errors: Array.isArray(data.message) ? data.message : [data.message]};
      } else {
        setUser({
          userName: data.name,
          userId: data.id,
        });
        setIsAuthenticated(true);
        return {status: true, errors: []};
      }
    });
  };

  const signIn = async (user: LogInUser): Promise<{status: boolean, errors: string[]}> => {
    const res = await logInRequest(user);
    return await res.json().then((data: LoginResponse) => {
      if (data.statusCode >= 400 || data.status >= 400) {
        setErrors(data.message);
        return {status: false, errors: Array.isArray(data.message) ? data.message : [data.message]};
      } else {
        setUser({
          userName: data.name,
          userId: data.id,
        });
        setIsAuthenticated(true);
        return {status: true, errors: []};
      }
    });
  };

  const forgotPassword = async (userEmail: ForgotPasswordRequestBody): Promise<boolean> => {
    await forgotPasswordRequest(userEmail);
    return true;
  };

  useEffect(() => {
    async function checkLogin(): Promise<void> {
      const cookies: {
        [key: string]: string;
      } = Cookies.get();
      console.log("🚀 ~ file: userContext.tsx:74 ~ checkLogin ~ cookies:", cookies)
      if (!cookies["access-token"]) {
        setIsAuthenticated(false);
        setUser(null);
        navigate("/index/login");
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies["access-token"]);
        void res.json().then((data: UserResp) => {
          console.log("🚀 ~ file: userContext.tsx:86 ~ voidres.json ~ data:", data)
          if (!data.userId) {
            setUser(null);
            setIsAuthenticated(false);
            navigate("/index/login");
            return;
          }
          setIsAuthenticated(true);
          setUser(data);
        });
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        navigate("/index/login");
      }
    }
    void checkLogin();
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        forgotPassword,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
