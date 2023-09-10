import { ThemeProvider } from "@/components/dashboard/ThemeProvider";
import Navbar from "@/components/dashboard/navbar/navbar";
import React from "react";
import Sidebar from "../../../components/dashboard/sidebar/Sidebar";
import "../../globals.css";

export const metadata = {
  title: "Sneak-Hive | dashboard",
  description: "Created to sell Sneakers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden w-screen h-screen">
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className="p-4 flex-1 max-h-[calc(100vh-80px)] overflow-y-auto">
            {children}
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
