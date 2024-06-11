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
                        ? "active bg-white text-black rounded-md px-3 py-2 text-sm font-bold"
                        : "text-white hover:bg-white hover:text-black rounded-md px-3 py-2 text-sm font-bold"
            }
        >
            {text}
        </NavLink>
    );
};

export default HeaderMenuItem;