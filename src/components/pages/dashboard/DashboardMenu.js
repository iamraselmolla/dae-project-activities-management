import React from 'react';
import { NavLink } from 'react-router-dom';

const DashboardMenu = () => {
    return (
        <>
            <NavLink
                to="/dashboard/all-projects"
                className={({ isActive, isPending }) =>
                    isPending
                        ? "pending block w-full"
                        : isActive
                            ? "active bg-gray-900 w-full block text-white rounded-md px-3 py-2 text-sm font-medium"
                            : "text-black hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-bold"
                }
            >
                হোম
            </NavLink>
        </>
    );
};

export default DashboardMenu;