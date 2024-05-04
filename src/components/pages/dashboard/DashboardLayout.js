import React from "react";
import DashboardMenu from "./DashboardMenu";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <section className="grid py-0">
      <div className="grid relative grid-cols-5">
        <div className="col-span-1 sticky top-0 h-screen">
          <div>
            <DashboardMenu />
          </div>
        </div>
        <div className="col-span-4 px-5 bg-slate-50	mx-2">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;
