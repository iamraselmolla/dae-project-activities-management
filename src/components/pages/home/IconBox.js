import React from 'react';

const IconBox = ({ backgroundColor, icon, text }) => {
    return (
        <div
            className={`h-80 rounded-xl flex flex-col items-center justify-center`}
            style={{ background: backgroundColor }}
        >
            <div
                className="flex h-30 text-white w-30 rounded-full justify-center items-center"
                style={{ background: "#fa5a7d" }}
            >
                {icon}
            </div>
            <p className="font-semibold">{text}</p>

        </div>
    );
};

export default IconBox;