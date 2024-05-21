import React from 'react';
import { Link } from 'react-router-dom';
import { MdExposurePlus1 } from "react-icons/md";

const AddModuleButton = ({ link }) => {
    return (
        <div className="text-right text-green-700 hover:text-white  w-12 hover:bg-green-500  h-12 flex justify-center items-center border-4 border-green-700 rounded fixed-button">
            <Link to={`/${link}`}>
                <div className="pulse">
                    <MdExposurePlus1 size={30} />
                </div>
            </Link>
        </div>
    );
};

export default AddModuleButton;
