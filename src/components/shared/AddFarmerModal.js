import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { createAFarmer } from '../../services/userServices';

const AddFarmerModal = ({ show, handleClose, farmerData }) => {
    const [loading, setLoading] = useState(false)
    const handleConfirm = async () => {
        try {
            setLoading(true)
            if (!farmerData?.farmersInfo?.farmerName) {
                return toast.error("কৃষকের নাম লিখো।");
            }

            const creationResult = await createAFarmer(farmerData);

            if (creationResult?.status === 200) {
                toast.success(creationResult?.data?.message);
                handleClose();
            } else {
                throw new Error("Unexpected response status");
            }
        } catch (error) {
            toast.error(
                "প্রদর্শনীর তথ্য হতে কৃষক ডাটা সংরক্ষণ করতে সমস্যার সৃষ্টি হচ্ছে ।..."
            );
            console.error("Error creating farmer:", error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${show ? 'block' : 'hidden'}`}>
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity"></div>
            <div className="bg-white rounded-lg shadow-lg transform transition-all sm:max-w-lg sm:w-full p-6">
                <h2 className="text-2xl font-semibold text-gray-800">{`${farmerData?.farmersInfo?.farmerName} নামের কৃষকের তথ্য ডাটাবেজে সংরক্ষণ নেই । আপনি কি তথ্য ডাটাবেজে সংরক্ষণ করতে চান ?`}</h2>
                <p className="mt-4 text-gray-600">আপনি কি তথ্য যুক্ত করতে চান ?</p>
                <div className="mt-6 flex justify-end">
                    <button
                        className="btn hover:bg-red-300 bg-red-500 text-white mr-2"
                        onClick={handleClose}
                    >
                        বাদ দিন
                    </button>
                    <button
                        className="btn theme-bg hover:bg-green-500 text-white"
                        onClick={handleConfirm}
                    >
                        {!loading ? '  যুক্ত করুন ' : <span className="loading loading-spinner loading-xs"></span>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddFarmerModal;
