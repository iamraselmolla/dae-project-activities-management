import React from 'react';
import { NavLink } from 'react-router-dom';

const DashboardMenu = () => {
    return (
        <>
            <NavLink
                to="/dashboard/all-projects"
                className={({ isActive, isPending }) =>
                    isPending
                        ? "block px-3 w-full text-center py-4 bg-slate-900"
                        : isActive
                            ? "block px-3 w-full py-4 text-center bg-red-500"
                            : "block px-3 w-full py-4 text-center bg-blue-400"
                }
            >
                সকল প্রকল্প
            </NavLink>
            <NavLink
                to="/dashboard/all-users"
                className={({ isActive, isPending }) =>
                    isPending
                        ? "block px-3 w-full text-center py-4 bg-slate-900"
                        : isActive
                            ? "block px-3 w-full py-4 text-center bg-red-500"
                            : "block px-3 w-full py-4 text-center bg-blue-400"
                }
            >
                সকল ইউজার
            </NavLink>
        </>
    );
};

export default DashboardMenu;