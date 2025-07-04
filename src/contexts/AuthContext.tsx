import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextProps {
  authed: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authed, setAuthed] = useState(() => localStorage.getItem("authed") === "true");

  const login = (username: string, password: string) => {
    if (username === "admin" && password === "admin123") {
      setAuthed(true);
      localStorage.setItem("authed", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuthed(false);
    localStorage.removeItem("authed");
  };

  return (
    <AuthContext.Provider value={{ authed, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}; 