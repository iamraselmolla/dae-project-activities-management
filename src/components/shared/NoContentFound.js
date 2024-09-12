import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa'; // Importing an icon from react-icons

const NoContentFound = ({ text }) => {
    return (
        <div className="flex justify-center items-center bg-gray-100 p-6">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="flex justify-center items-center mb-4">
                    <FaExclamationTriangle className="text-red-500 text-4xl mr-2" />
                    <h2 className="text-gray-700 text-xl font-semibold">
                        {text}
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default NoContentFound;
