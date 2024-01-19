// src/components/DashboardLayout.jsx
import React from "react";
import Sidebar from "./_components/sidebar";
import Navbar from "./_components/dashboard-navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden ml-64">
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
