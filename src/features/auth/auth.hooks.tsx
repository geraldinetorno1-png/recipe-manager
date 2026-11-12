import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { AuthValue } from "./auth.types";

const AuthContext = createContext<AuthValue | null>(null);
const KEY = "auth-user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(() => {
    try { return localStorage.getItem(KEY)?.trim() || null; }
    catch { return null; }
  });
  const login = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    localStorage.setItem(KEY, trimmed);
    setUser(trimmed);
  };
  const logout = () => {
    localStorage.removeItem(KEY);
    setUser(null);
  };
  return <AuthContext.Provider value={{ user, isLoggedIn: Boolean(user), login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
  return context;
}
