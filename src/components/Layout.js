import React, { useState } from 'react';
import Header from './header/Header';
import { Link, Outlet } from 'react-router-dom';
import Footer from './footer/Footer';
import { GoPlusCircle } from 'react-icons/go';
import '../css/Layout.css'; // Import your CSS file

const Layout = () => {
    const [open, setOpen] = useState(false);

    return (
        <main>
            <Header />
            <div className="bg-slate-100">
                <Outlet />
                <div className="fixed flex justify-center flex-col bottom-5 right-5 items-center">
                    <div className={`menu-drawer ${open ? 'open' : ''}`}>
                        <Link className='menu-item' to="/addDemo">প্রদর্শনী</Link>
                        <Link className='menu-item' to="/addTraining">প্রশিক্ষণ</Link>
                        <Link className='menu-item' to="/addFieldDay">মাঠদিবস</Link>
                        <Link className='menu-item' to="/addDistribution">বিতরণ</Link>
                        <Link className='menu-item' to="/add-dae-group-meeting">গ্রুপ সভা</Link>
                        <Link className='menu-item' to="/add-motivational-tour">ভ্রমণ</Link>
                        <Link className='menu-item' to="/add-school">স্কুল</Link>
                    </div>
                    <div className='mt-5 flex justify-center items-center flex-col'>
                        <GoPlusCircle
                            onClick={() => setOpen(!open)}
                            cursor={'pointer'}
                            color="green"
                            size={60}
                            className={`menu-icon ${open ? 'open' : ''}`}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default Layout;
