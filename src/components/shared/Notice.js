import React, { useState, useContext } from 'react';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import UserListModal from './UserListModal';
import { AuthContext } from '../AuthContext/AuthProvider';

const priorityClasses = {
    High: 'bg-red-100 border-red-500',
    Medium: 'bg-yellow-100 border-yellow-500',
    Low: 'bg-green-100 border-green-500',
};

const Notice = ({ notice }) => {
    const [showAssignedModal, setShowAssignedModal] = useState(false);
    const { user, role } = useContext(AuthContext);

    const handleShowAssignedModal = () => setShowAssignedModal(true);
    const handleCloseAssignedModal = () => setShowAssignedModal(false);
    const handleDelete = () => {
        // Add delete functionality here
    };

    return (
        <div
            key={notice._id}
            className={`relative p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 border ${priorityClasses[notice.priority]}`}
        >
            <h2 className="text-xl font-bold mb-2">
                <Link to={`/notice-details/${notice._id}`} className="hover:underline">
                    {notice.subject}
                </Link>
            </h2>
            <p className="mb-2">{notice.content}</p>
            {notice.link && (
                <a href={notice.link} className="underline" onClick={(e) => e.stopPropagation()}>
                    {notice.linkText}
                </a>
            )}
            {notice.expirationDate && (
                <p className="mt-4 text-sm">
                    Expires on: {new Date(notice.expirationDate).toLocaleDateString("bn-BD")}
                </p>
            )}
            <p className="mt-2 font-bold">
                Priority: {notice.priority}
            </p>

            <div className="absolute top-4 right-4">
                {notice.sendToAll ? (
                    <span className="text-xs bg-green-500 text-white py-1 px-2 rounded">All</span>
                ) : (
                    <AiOutlineUsergroupAdd
                        className="text-2xl cursor-pointer"
                        onClick={handleShowAssignedModal}
                    />
                )}
            </div>

            {user && role === 'admin' && (
                <div className="absolute bottom-4 right-4 flex space-x-2">
                    <Link to={`/add-notice?id=${notice._id}`} onClick={(e) => e.stopPropagation()}>
                        <FaEdit className="text-blue-500 cursor-pointer" />
                    </Link>
                    <FaTrash
                        className="text-red-500 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(notice);
                        }}
                    />
                </div>
            )}

            <UserListModal
                showModal={showAssignedModal}
                handleCloseModal={handleCloseAssignedModal}
                title="সংযুক্ত ব্লক ও সংশ্লিষ্ট উপসহকারী কৃষি কর্মকর্তাগণঃ"
                users={notice.recipients}
            />
        </div>
    );
};

export default Notice;
