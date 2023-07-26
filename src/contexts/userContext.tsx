import { createContext, useEffect, useState } from "react";
import { registerRequest, logInRequest } from "../api/auth";
import jwt_decode from "jwt-decode";

export interface UserResp {
  userToken: string;
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
  access_token: string;
  statusCode: number;
  message: string[];
}
interface SigninResponse {
  access_token: string;
  statusCode: number;
  message: string[];
}
interface DecodedToken {
  username: string;
  sub: string;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{
    userToken: string;
    userName: string;
    userId: string;
  } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const signUp = async (user: User) => {
    const res = await registerRequest(user);
    console.log(res);
    void res.json().then((data: SigninResponse) => {
      console.log("DATA: ", data);
      if (data.statusCode === 400) {
        setErrors(data.message);
        errors.forEach((error) => {
          alert(error);
        });
        return;
      } else {
        const decoded: DecodedToken = jwt_decode(data.access_token);
        const userData = {
          userToken: data.access_token,
          userName: decoded.username,
          userId: decoded.sub,
        };
        setUser(userData);
        setIsAuthenticated(true);
      }
    });
  };

  const signIn = async (user: LogInUser) => {
    const res = await logInRequest(user);
    console.log(res);

    void res.json().then((data: LoginResponse) => {
      if (data.statusCode === 400) {
        setErrors(data.message);
        errors.forEach((error) => {
          alert(error);
        });
        return;
      } else {
        const decoded: DecodedToken = jwt_decode(data.access_token);
        const userData = {
          userToken: data.access_token,
          userName: decoded.username,
          userId: decoded.sub,
        };
        setUser(userData);
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
