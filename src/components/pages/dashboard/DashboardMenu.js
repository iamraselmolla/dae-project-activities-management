import React from 'react';
import { NavLink } from 'react-router-dom';

const DashboardMenu = () => {
    return (
        <>
            <NavLink
                to="/dashboard"
                className={({ isActive, isPending }) =>
                    isPending
                        ? "block px-3 w-full text-center py-4 bg-slate-900"
                        : isActive
                            ? "block px-3 w-full py-4 text-center bg-red-500"
                            : "block px-3 w-full py-4 text-center"
                }
            >
                Dashboard
            </NavLink>
            <NavLink
                to="/dashboard/all-projects"
                className={({ isActive, isPending }) =>
                    isPending
                        ? "block px-3 w-full text-center py-4 bg-slate-900"
                        : isActive
                            ? "block px-3 w-full py-4 text-center bg-red-500"
                            : "block px-3 w-full py-4 text-center"
                }
            >
                সকল প্রকল্প
            </NavLink>
            <NavLink
                to="/dashboard/all-users"
                className={({ isActive, isPending }) =>
                    isPending
                        ? "block px-3 w-full text-center py-4 bg-slate-900"
                        : isActive
                            ? "block px-3 w-full py-4 text-center bg-red-500"
                            : "block px-3 w-full py-4 text-center"
                }
            >
                সকল ইউজার
            </NavLink>
            <NavLink
                to="/dashboard/addproject"
                className={({ isActive, isPending }) =>
                    isPending
                        ? "block px-3 w-full text-center py-4 bg-slate-900"
                        : isActive
                            ? "block px-3 w-full py-4 text-center bg-red-500"
                            : "block px-3 w-full py-4 text-center"
                }
            >
                নতুন প্রকল্প যুক্ত করুন
            </NavLink>
            <NavLink
                to="/dashboard/user-demos"
                className={({ isActive, isPending }) =>
                    isPending
                        ? "block px-3 w-full text-center py-4 bg-slate-900"
                        : isActive
                            ? "block px-3 w-full py-4 text-center bg-red-500"
                            : "block px-3 w-full py-4 text-center"
                }
            >
                প্রদর্শনী
            </NavLink>
            <NavLink
                to="/dashboard/trainings"
                className={({ isActive, isPending }) =>
                    isPending
                        ? "block px-3 w-full text-center py-4 bg-slate-900"
                        : isActive
                            ? "block px-3 w-full py-4 text-center bg-red-500"
                            : "block px-3 w-full py-4 text-center"
                }
            >
                প্রশিক্ষণ
            </NavLink>
            <NavLink
                to="/dashboard/user-fielddays"
                className={({ isActive, isPending }) =>
                    isPending
                        ? "block px-3 w-full text-center py-4 bg-slate-900"
                        : isActive
                            ? "block px-3 w-full py-4 text-center bg-red-500"
                            : "block px-3 w-full py-4 text-center"
                }
            >
                মাঠ দিবস
            </NavLink>
            <NavLink
                to="/dashboard/user-dae-meetings"
                className={({ isActive, isPending }) =>
                    isPending
                        ? "block px-3 w-full text-center py-4 bg-slate-900"
                        : isActive
                            ? "block px-3 w-full py-4 text-center bg-red-500"
                            : "block px-3 w-full py-4 text-center"
                }
            >
                ডিএই কৃষক গ্রুপ সভা
            </NavLink>
            <NavLink
                to="/dashboard/add-note"
                className={({ isActive, isPending }) =>
                    isPending
                        ? "block px-3 w-full text-center py-4 bg-slate-900"
                        : isActive
                            ? "block px-3 w-full py-4 text-center bg-red-500"
                            : "block px-3 w-full py-4 text-center"
                }
            >
                নোট যুক্ত করুন
            </NavLink>
            <NavLink
                to="/dashboard/user-notes"
                className={({ isActive, isPending }) =>
                    isPending
                        ? "block px-3 w-full text-center py-4 bg-slate-900"
                        : isActive
                            ? "block px-3 w-full py-4 text-center bg-red-500"
                            : "block px-3 w-full py-4 text-center"
                }
            >
                নোটস
            </NavLink>
        </>
    );
};

export default DashboardMenu;