import React from "react";
import { Outlet } from "react-router-dom";
import AsideBar from "../components/AsideBar";

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AsideBar />
      <div className={`flex-1 ml-64 transition-all duration-300`}>
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
