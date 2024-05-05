import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderMenuItem = ({ link, text }) => {
    return (
        <NavLink
            to={`/${link}`}
            className={({ isActive, isPending }) =>
                isPending
                    ? "pending"
                    : isActive
                        ? "active bg-gray-900 text-black rounded-md px-3 py-2 text-sm font-medium"
                        : "text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-bold"
            }
        >
            {text}
        </NavLink>
    );
};

export default HeaderMenuItem;