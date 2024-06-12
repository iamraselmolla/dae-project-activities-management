import React from 'react';
import { NavLink } from 'react-router-dom';

const DashboardMenuItem = ({ link, text, icon }) => {
    return (
        <NavLink
            end
            to={`/dashboard${link}`}
            className={({ isActive, isPending }) =>
                isPending
                    ? "block px-3 md:px-4 lg:w-full md:w-full w-auto py-4 bg-slate-900"
                    : isActive
                        ? "rounded-xl px-3 md:px-2 lg:w-full md:w-full w-auto py-2 md:py-4 flex items-center gap-2 md:gap-4 md:ps-0 lg:justify-start md:justify-start justify-center  lg:ps-6  font-bold  theme-bg text-white"
                        : "rounded-xl px-1  lg:w-full md:w-full w-auto py-2 md:py-4  lg:py-4 flex items-center gap-2 md:gap-4 md:ps-0 lg:ps-6 font-bold "
            }
        >
            {icon} {text}
        </NavLink>
    );
};

export default DashboardMenuItem;