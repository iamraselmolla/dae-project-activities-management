import React from 'react';
import { Link } from 'react-router-dom';

const AddModuleButton = ({ link, btnText }) => {
    return (
        <div className="text-right font-extrabold">
            <Link to={`/${link}`}>
                <button className="btn btn-outline btn-accent mb-5 border-2 px-5 py-22">
                    <div className="flex justify-center items-center gap-2 text-lg">
                        <span className="relative flex h-8 w-8">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-8 w-8 bg-sky-500"></span>
                        </span>
                        <div>{btnText}</div>
                    </div>
                </button>
            </Link >
        </div>
    );
};

export default AddModuleButton;