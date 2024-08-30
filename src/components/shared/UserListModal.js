import React from 'react';
import { toBengaliNumber } from 'bengali-number';

const UserListModal = ({ showModal, handleCloseModal, title, users }) => {
    return (
        <>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Background overlay */}
                    <div className="fixed inset-0 bg-black opacity-50"></div>

                    {/* Modal content */}
                    <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full max-h-full overflow-y-auto">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">{title}</h2>
                            <button
                                className="text-black hover:text-red-500"
                                onClick={handleCloseModal}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Content */}
                        <div className="overflow-y-auto">
                            <ul>
                                {users?.map((user, index) => (
                                    <li key={index} className="mb-2">
                                        <p>{`${toBengaliNumber(index + 1)}. ${user?.userId?.SAAO?.name}, ${user?.userId?.blockB}`}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Footer */}
                        <div className="mt-4 text-right">
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
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
