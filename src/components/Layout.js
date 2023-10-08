import React from 'react';
import Header from './header/Header';
import { Outlet } from 'react-router-dom';
import Footer from './footer/Footer';

const Layout = () => {
    return (
        <main>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </main>
    );
};

export default Layout;