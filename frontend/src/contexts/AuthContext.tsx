import { User, UserType, UserTypeEnum } from "@/@types/user";
import { useLogin } from "@/services/hooks/auth/useLogin";
import { useActivateUser } from "@/services/hooks/user/useActivateUser";
import { useCreateCandidate } from "@/services/hooks/user/useCreateCandidate";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  user: User | null;
  loginHandler: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Partial<User>) => Promise<boolean>;
  activateAccountHandler: (token: number, password: string, previousPassword: string) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const { login, loginStatus } = useLogin();
  const { createCandidate, createCandidatestatus } = useCreateCandidate();
  const { activateUser, activateUserStatus } = useActivateUser();

  useEffect(() => {
    const savedUser = sessionStorage.getItem("@CandidatePortal:user");
    if (savedUser && savedUser !== "undefined") {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const loginHandler = async (email: string, password: string): Promise<boolean> => {
    const { user } = await login({ email, password });

    setUser(user);
    sessionStorage.setItem("@CandidatePortal:user", JSON.stringify(user));
    return true;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("@CandidatePortal:user");
  };

  const register = async (userData: Partial<User>): Promise<boolean> => {
    const response = await createCandidate(userData);

    console.log("Dados de cadastros:", response);
    return response;
  };

  const activateAccountHandler = async (
    token: number,
    password: string,
    previousPassword: string
  ): Promise<boolean> => {
    const response = await activateUser({ id: token, password, previousPassword });

    console.log("Ativando conta com token:", token, "e senha:", password);
    return response;
  };

  const isLoading = [loginStatus, activateUserStatus, createCandidatestatus].some((value) => value === "pending");

  return (
    <AuthContext.Provider value={{ user, loginHandler, logout, register, activateAccountHandler, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
