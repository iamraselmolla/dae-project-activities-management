import React from 'react';
import { NavLink } from 'react-router-dom';

const DashboardMenuItem = ({ link, text, icon }) => {
    return (
        <NavLink
            to={`/dashboard${link}`}
            className={({ isActive, isPending }) =>
                isPending
                    ? "block px-3 w-full text-center py-4 bg-slate-900"
                    : isActive
                        ? "block rounded-xl px-3 w-full py-4 text-center flex items-center gap-3 justify-center font-bold  bg-blue-200"
                        : "block rounded-xl px-3 w-full py-4 text-center flex items-center gap-3 justify-center font-bold "
            }
        >
            {icon} {text}
        </NavLink>
    );
};

export default DashboardMenuItem;