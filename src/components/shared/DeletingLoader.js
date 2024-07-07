import React from 'react';
import Loader from './Loader';

const DeletingLoader = () => {
    return (
        <div className="w-screen absolute top-0 left-0 h-screen flex justify-center items-center bg-slate-400 opacity-25">
            <Loader />
        </div>
    );
};

export default DeletingLoader;