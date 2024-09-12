import React from 'react';
import { Link } from 'react-router-dom'; // Importing Link from react-router-dom
import { FaRegFrown } from 'react-icons/fa'; // Importing an icon from react-icons

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <FaRegFrown className="text-gray-500 text-6xl mb-4" />
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    এই পেজটি সিস্টেমে পাওয়া যায়নি।
                </h1>
                <p className="text-gray-600 mb-6">
                    আমরা দুঃখিত, আপনি যে পৃষ্ঠা খুঁজছেন তা পাওয়া যায়নি. অনুগ্রহ করে আবার চেষ্টা করুন বা নিচের বাটনে ক্লিক করুন।
                </p>
                <Link to="/" className="theme-bg text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                    হোমপেজে ফিরে যান
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
