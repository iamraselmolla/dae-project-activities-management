import React from 'react';
import { toBengaliNumber } from 'bengali-number';

const UserListModal = ({ showModal, handleCloseModal, title, users }) => {
    return (
        <>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Background overlay */}
                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={handleCloseModal}
                    ></div>

                    {/* Modal content */}
                    <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto border border-gray-200">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-blue-600">{title}</h2>
                            <button
                                className="text-red-500 hover:text-red-700 text-2xl"
                                onClick={handleCloseModal}
                            >
                                &times;
                            </button>
                        </div>

                        {/* Content */}
                        <div className="overflow-y-auto">
                            {users && users.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {users.map((user, index) => (
                                        <div key={index} className="bg-gray-100 px-4 py-3 rounded-lg shadow-md border border-gray-300 flex items-center">
                                            {/* User Icon */}
                                            <div className="w-12 h-12 theme-bg text-white flex items-center justify-center rounded-full text-xl font-bold mr-4">
                                                {toBengaliNumber(index + 1)}
                                            </div>
                                            <div>
                                                <p className="text-lg font-semibold text-gray-800">{user?.userId?.SAAO?.name}</p>
                                                <p className="text-sm text-gray-600">ব্লক: {user?.userId?.blockB}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-6">
                                    <p className="text-xl font-semibold text-gray-600">কোনো ইউজার এই ক্যাটাগরিতে নেই ।</p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="mt-6 text-right">
                            <button
                                className="theme-bg text-white py-2 px-6 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
                                onClick={handleCloseModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserListModal;
