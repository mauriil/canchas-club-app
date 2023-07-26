import { createContext, useEffect, useState } from "react";
import { registerRequest, logInRequest } from "../api/auth";

export interface UserResp {
  userName: string;
  userId: string;
}

interface AuthContextType {
  signUp: (user: User) => void;
  signIn: (user: LogInUser) => void;
  user: UserResp | null;
  isAuthenticated: boolean;
  errors: string[];
}

export const AuthContext = createContext<AuthContextType | null>(null);

export interface User {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface LogInUser {
  email: string;
  password: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface LoginResponse {
  name: string;
  id: string;
  statusCode: number;
  message: string[];
}
interface SigninResponse {
  name: string;
  id: string;
  statusCode: number;
  message: string[];
}
interface DecodedToken {
  username: string;
  sub: string;
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
    void res.json().then((data: SigninResponse) => {
      console.log("DATA: ", data);
      if (data.statusCode === 400) {
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
      if (data.statusCode === 400) {
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
