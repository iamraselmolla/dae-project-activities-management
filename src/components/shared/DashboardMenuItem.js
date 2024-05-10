import React from 'react';
import { NavLink } from 'react-router-dom';

const DashboardMenuItem = ({ link, text, icon }) => {
    return (
        <NavLink
            to={`/dashboard${link}`}
            className={({ isActive, isPending }) =>
                isPending
                    ? "block px-1 w-full py-4 bg-slate-900"
                    : isActive
                        ? "rounded-xl px-1 w-full py-4 flex items-center gap-2 justify-center font-bold  bg-blue-200"
                        : "rounded-xl px-1 w-full py-4 flex items-center gap-2 justify-center font-bold "
            }
        >
            {icon} {text}
        </NavLink>
    );
};

export default DashboardMenuItem;