import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import Login from "../shared/Login";
import { AuthContext } from "../AuthContext/AuthProvider";
import HeaderMenuItem from "../shared/HeaderMenuItem";
import { FaRegCircleUser } from "react-icons/fa6";


const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { user, setUser, setRole } = useContext(AuthContext);
  const handleToLogOut = () => {
    localStorage.removeItem("CurrentUser");
    localStorage.removeItem("CurrentUserToken");
    setUser(null);
    setShowMenu(false);
    setRole(null);
  };

  return (
    <nav className="bg-slate-400">
      <div className="navbar mx-auto px-2 sm:px-6 lg:px-8">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn flex sm:flex md:flex lg:hidden text-white btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className={`menu menu-sm flex flex-col gap-4 dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ${!showMenu ? "block" : "hidden"
                }`}
            >
              <HeaderMenuItem link="" text="হোম" />
              <HeaderMenuItem link="demos" text="প্রদর্শনী" />
              <HeaderMenuItem link="trainings" text="প্রশিক্ষণ" />
              <HeaderMenuItem link="fielddays" text="মাঠদিবস" />
              <HeaderMenuItem link="distributions" text="উপকরণ বিতরণ" />
              <HeaderMenuItem
                link="dae-group-meeting"
                text="ডিএই কৃষক গ্রুপ সভা"
              />
              <HeaderMenuItem
                link="motivational-tour"
                text="উদ্বুদ্ধকরণ ভ্রমণ"
              />
              <HeaderMenuItem link="all-schools" text="স্কুল" />
              <HeaderMenuItem link="all-projects" text="প্রকল্প" />
              <HeaderMenuItem link="all-users" text="ব্যবহারকারী" />
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-white text-xl">
            <img src="/images/logo.png" width={'60px'} alt="" srcSet="" />
          </Link>
        </div>
        <div className="navbar-center gap-2 hidden sm:hidden md:hidden lg:flex">
          <HeaderMenuItem link="" text="হোম" />
          <HeaderMenuItem link="demos" text="প্রদর্শনী" />
          <HeaderMenuItem link="trainings" text="প্রশিক্ষণ" />
          <HeaderMenuItem link="fielddays" text="মাঠদিবস" />
          <HeaderMenuItem link="distributions" text="উপকরণ বিতরণ" />
          <HeaderMenuItem link="dae-group-meeting" text="ডিএই কৃষক গ্রুপ সভা" />
          <HeaderMenuItem link="motivational-tour" text="উদ্বুদ্ধকরণ ভ্রমণ" />
          <HeaderMenuItem link="all-schools" text="স্কুল" />
          <HeaderMenuItem link="all-projects" text="প্রকল্প" />
          <HeaderMenuItem link="all-users" text="ব্যবহারকারী" />
        </div>
        <div className="navbar-end">
          <div className="absolute right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {user && (
              <>
                <div className="relative ml-3">
                  <div onClick={() => setShowMenu(!showMenu)}>
                    <button
                      type="button"
                      className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="absolute -inset-1.5"></span>
                      <span className="sr-only">Open user menu</span>
                      <FaRegCircleUser size={25} color="white" />
                    </button>
                  </div>

                  {showMenu && (
                    <>
                      <div
                        className={`absolute flex flex-col text-black gap-2   right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${showMenu ? "block" : "hidden"
                          }`}
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu-button"
                        tabIndex="-1"
                      >
                        <HeaderMenuItem link="dashboard" text="Dashboard" />
                        <NavLink
                          to={`/dashboard/profile`}
                          className={({ isActive, isPending }) =>
                            isPending
                              ? "pending"
                              : isActive
                                ? "active bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                                : "text-black hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-bold"
                          }
                        >
                          প্রফাইল
                        </NavLink>
                        <Link
                          href="#"
                          onClick={handleToLogOut}
                          className="block font-extrabold px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          tabIndex="-1"
                          id="user-menu-item-2"
                        >
                          Sign out
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
            {!user && (
              <>
                <AiOutlineLogin
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                  size={35}
                  cursor="pointer"
                  color="white"
                />
                <Login />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
