import { createContext, useState } from "react";
import { registerRequest } from "../api/auth";
import jwt_decode from "jwt-decode";

export interface UserResp {
  userToken: string;
  userName: string;
  userId: string;
}

interface AuthContextType {
  signUp: (user: User) => void;
  user: UserResp | null;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export interface User {
  name: string;
  email: string;
  password: string;
  phone: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface SigninResponse {
  access_token: string;
  statusCode: number;
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

  const signUp = async (user: User) => {
    try {
      const res = await registerRequest(user);
      console.log(res);
      void res.json().then((data: SigninResponse) => {
        console.log("DATA: ", data);
        if (data.statusCode === 400) {
          alert("Usuario o contraseña incorrectos");
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        user,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
