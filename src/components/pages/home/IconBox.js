import React from 'react';

const IconBox = ({ backgroundColor, icon, text }) => {
    return (
        <div
            className={`h-60 rounded-xl flex flex-col items-center justify-center`}
            style={{ background: backgroundColor }}
        >
            <div
                className="flex h-20 w-20 text-4xl mb-3 text-white rounded-full justify-center items-center"
                style={{ background: "#fa5a7d" }}
            >
                {icon}
            </div>
            <p className="font-semibold text-xl mt-4">{text}</p>

        </div>
    );
};

export default IconBox;