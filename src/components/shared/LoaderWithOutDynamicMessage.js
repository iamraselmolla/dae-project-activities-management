import React from 'react';
import Loader from './Loader';

const LoaderWithOutDynamicMessage = () => {
    return (
        <div className="w-full h-full">
            <div className="fixed px-10 py-16 w-10/12 opacity-50 daeLoader">
                <Loader />
            </div>
        </div>
    );
};

export default LoaderWithOutDynamicMessage;