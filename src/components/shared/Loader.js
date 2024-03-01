import React from 'react';

const Loader = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );
};

export default Loader;