"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
interface SessionProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<SessionProviderProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
