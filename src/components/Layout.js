import React, { useContext } from 'react';
import Header from './header/Header';
import { Outlet } from 'react-router-dom';
import Footer from './footer/Footer';
import '../css/Layout.css'; // Import your CSS file
import { AuthContext } from './AuthContext/AuthProvider';
import FixedMenu from './shared/FixedMenu';

const Layout = () => {
    const { user } = useContext(AuthContext)


    return (
        <main>
            <Header />
            <div className="bg-slate-100">
                <div className="min-h-screen">
                    <Outlet />
                </div>
                {user && <FixedMenu />}

            </div>
            <Footer />
        </main>
    );
};

export default Layout;
