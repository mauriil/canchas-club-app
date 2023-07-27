/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createContext, useEffect, useState } from "react";
import { registerRequest, logInRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";
import { LogInUser, LoginResponse, SigningResponse, User, UserResp } from "../types/users";

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextType {
  signUp: (user: User) => void;
  signIn: (user: LogInUser) => void;
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

  const signUp = async (user: User) => {
    const res = await registerRequest(user);
    void res.json().then((data: SigningResponse) => {
      console.log("DATA: ", data);
      if (data.statusCode > 400 || data.status > 400) {
        setErrors(data.message);
        errors.forEach((error) => {
          alert(error);
        });
        return;
      } else {
        setUser({
          userName: data.name,
          userId: data.id,
        });
        setIsAuthenticated(true);
      }
    });
  };

  const signIn = async (user: LogInUser) => {
    const res = await logInRequest(user);
    void res.json().then((data: LoginResponse) => {
      if (data.statusCode > 400 || data.status > 400) {
        setErrors(data.message);
        errors.forEach((error) => {
          alert(error);
        });
        return;
      } else {
        setUser({
          userName: data.name,
          userId: data.id,
        });
        setIsAuthenticated(true);
      }
    });
  };

  useEffect(() => {
    async function checkLogin(): Promise<void> {
      const cookies: {
        [key: string]: string;
      } = Cookies.get();
      if (!cookies["access-token"]) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies["access-token"]);
        void res.json().then((data: UserResp) => {
          if (!data.userId) {
            setIsAuthenticated(false);
            return;
          }
          setIsAuthenticated(true);
          setUser(data);
        });
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      }
    }
    void checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
