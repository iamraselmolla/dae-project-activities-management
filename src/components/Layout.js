import React from 'react';
import Header from './header/Header';
import { Link, Outlet } from 'react-router-dom';
import Footer from './footer/Footer';
import { GoPlusCircle } from 'react-icons/go';
import { IoIosCloseCircleOutline } from "react-icons/io";


const Layout = () => {
    return (
        <main>
            <Header></Header>
            <div className="bg-slate-100">
                <Outlet></Outlet>
                <div className="fixed bottom-5 right-5">

                    <div className="flex justify-center items-center flex-col gap-3">
                        <Link to="/addDemo">প্রদর্শনী</Link>
                        <Link to="/addDemo">প্রদর্শনী</Link>
                        <Link to="/addDemo">প্রদর্শনী</Link>
                        <Link to="/addDemo">প্রদর্শনী</Link>
                        <Link to="/addDemo">প্রদর্শনী</Link>
                        <Link to="/addDemo">প্রদর্শনী</Link>
                        <Link to="/addDemo">প্রদর্শনী</Link>
                    </div>


                    <GoPlusCircle color="green" size={40} className="mt-4" />
                    <IoIosCloseCircleOutline color="green" size={45} className="mt-4" />

                </div>
            </div>
            <Footer></Footer>
        </main>
    );
};

export default Layout;