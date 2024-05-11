import React from "react";
import DashboardMenu from "./DashboardMenu";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <section className="grid py-0">
      <div className="grid relative grid-cols-12">
        <div className="col-span-2 mx-4 sticky top-0 h-screen">
          <div className="py-5 px-1">
            <DashboardMenu />
          </div>
        </div>
        <div className="col-span-10 px-7 bg-slate-50	mx-2">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;
