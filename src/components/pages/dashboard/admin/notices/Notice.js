import React, { useState } from 'react';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FaEdit, FaTrash } from 'react-icons/fa';
import UserListModal from "../../../../shared/UserListModal";

const priorityClasses = {
    High: 'text-red-500',
    Medium: 'text-yellow-500',
    Low: 'text-green-500'
};

const Notice = ({ notice, handleEdit, handleDelete }) => {
    const [showAssignedModal, setShowAssignedModal] = useState(false);

    const handleShowAssignedModal = () => setShowAssignedModal(true);
    const handleCloseAssignedModal = () => setShowAssignedModal(false);

    return (
        <div
            key={notice._id}
            className="relative p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 border"
        >
            <h2 className="text-xl font-bold mb-2">{notice.subject}</h2>
            <p className="mb-2">{notice.content}</p>
            {notice.link && (
                <a href={notice.link} className="underline">{notice.linkText}</a>
            )}
            {notice?.expirationDate && <p className="mt-4 text-sm">Expires on: {new Date(notice.expirationDate).toLocaleDateString("bn-BD")}</p>}
            <p className={`mt-2 font-bold ${priorityClasses[notice.priority]}`}>Priority: {notice.priority}</p>

            <div className="absolute top-4 right-4 flex space-x-2">
                {notice.sendToAll ? (
                    <span className="text-xs bg-green-500 text-white py-1 px-2 rounded">All</span>
                ) : (
                    <AiOutlineUsergroupAdd
                        className="text-2xl cursor-pointer"
                        onClick={handleShowAssignedModal}
                    />
                )}
            </div>
            <div className="absolute bottom-4 right-4 flex space-x-2">
                <FaEdit className="text-blue-500 cursor-pointer" onClick={() => handleEdit(notice)} />
                <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDelete(notice)} />
            </div>
            <UserListModal
                showModal={showAssignedModal}
                handleCloseModal={handleCloseAssignedModal}
                title="Assigned Users"
                users={notice.recipients}
            />
        </div>
    );
};

export default Notice;
