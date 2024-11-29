import React from "react";
import { Outlet } from "react-router-dom";
import AsideBar from "./AsideBar";

function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AsideBar />
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
