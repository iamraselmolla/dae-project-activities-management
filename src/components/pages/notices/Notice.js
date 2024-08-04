// src/Notice.js
import React, { useState } from 'react';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import UserListModal from "../../shared/UserListModal"

const priorityColors = {
    High: 'bg-red-500 text-white',
    Medium: 'bg-yellow-500 text-white',
    Low: 'bg-green-500 text-white'
};

const Notice = ({ notice, handleShowRecipients }) => {
    const [showCompletedModal, setShowCompletedModal] = useState(false);
    const [showNotCompletedModal, setShowNotCompletedModal] = useState(false);

    const completedUsers = notice.userActions.filter(action => action.completed);
    const notCompletedUsers = notice.userActions.filter(action => !action.completed);

    const handleShowCompletedModal = () => setShowCompletedModal(true);
    const handleCloseCompletedModal = () => setShowCompletedModal(false);

    const handleShowNotCompletedModal = () => setShowNotCompletedModal(true);
    const handleCloseNotCompletedModal = () => setShowNotCompletedModal(false);

    return (
        <div
            key={notice._id}
            className={`relative p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 ${priorityColors[notice.priority]}`}
        >
            <Link to={`/notices/${notice._id}`}>
                <h2 className="text-xl font-bold mb-2">{notice.subject}</h2>
                <p className="mb-2">{notice.content}</p>
                {notice.link && (
                    <a href={notice.link} className="underline">{notice.linkText}</a>
                )}
                {notice?.expirationDate && <p className="mt-4 text-sm">Expires on: {new Date(notice.expirationDate).toLocaleDateString("bn-BD")}</p>}
            </Link>
            <div className="absolute top-4 right-4 flex space-x-2">
                <div className="flex items-center space-x-1 cursor-pointer" onClick={handleShowCompletedModal}>
                    <FaCheckCircle className="text-green-500" />
                    <span>{completedUsers.length}</span>
                </div>
                <div className="flex items-center space-x-1 cursor-pointer" onClick={handleShowNotCompletedModal}>
                    <FaTimesCircle className="text-red-500" />
                    <span>{notCompletedUsers.length}</span>
                </div>
                {notice.sendToAll ? (
                    <span className="text-xs bg-green-500 text-white py-1 px-2 rounded">All</span>
                ) : (
                    <AiOutlineUsergroupAdd
                        className="text-2xl cursor-pointer"
                        onClick={() => handleShowRecipients(notice?.recipients)}
                    />
                )}
            </div>
            <UserListModal
                showModal={showCompletedModal}
                handleCloseModal={handleCloseCompletedModal}
                title="সম্পন্ন"
                users={completedUsers}
            />
            <UserListModal
                showModal={showNotCompletedModal}
                handleCloseModal={handleCloseNotCompletedModal}
                title="অসম্পন্ন"
                users={notCompletedUsers}
            />
        </div>
    );
};

export default Notice;
