import React from 'react';
import { NavLink } from 'react-router-dom';

const FooterMenuItem = ({ link, text }) => {
    return (
        <NavLink
            to={`/${link}`} className={'text-blue-400 font-bold '}
        >
            {text}
        </NavLink>
    );
};

export default FooterMenuItem;