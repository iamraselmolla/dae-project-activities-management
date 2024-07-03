import React from 'react';
import Loader from './Loader';

const LoaderWithOutDynamicMessage = () => {
    return (
        <div className="w-full h-full">
            <div className="fixed px-10 py-16  bg-black opacity-50 daeLoader">
                <Loader />
                <h2 className="text-white mt-3 font-extrabold text-4xl">
                    তথ্য আনা হচ্ছে। দয়া করে অপেক্ষা করুন
                </h2>
            </div>
        </div>
    );
};

export default LoaderWithOutDynamicMessage;