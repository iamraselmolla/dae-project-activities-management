import React from 'react';

const NoContentFound = ({ text }) => {
    return (
        <div className="flex justify-center py-8 items-center">
            <h2 className="text-red-600 text-2xl  font-extrabold">
                {text}
            </h2>
        </div>
    );
};

export default NoContentFound;