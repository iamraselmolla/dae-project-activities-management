import React, { useState, useContext } from 'react';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FaCheckCircle, FaTimesCircle, FaEdit, FaTrash } from 'react-icons/fa';
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
    const [showCompletedModal, setShowCompletedModal] = useState(false);
    const [showNotCompletedModal, setShowNotCompletedModal] = useState(false);
    const { user, role } = useContext(AuthContext);

    const handleShowAssignedModal = () => setShowAssignedModal(true);
    const handleCloseAssignedModal = () => setShowAssignedModal(false);

    const handleShowCompletedModal = () => setShowCompletedModal(true);
    const handleCloseCompletedModal = () => setShowCompletedModal(false);

    const handleShowNotCompletedModal = () => setShowNotCompletedModal(true);
    const handleCloseNotCompletedModal = () => setShowNotCompletedModal(false);

    const handleDelete = () => {
        // Delete logic here
    };

    const completedUsers = notice?.userActions?.filter(action => action.completed) || [];
    const notCompletedUsers = notice?.userActions?.filter(action => !action.completed) || [];
    const assignedUsers = notice?.recipients || [];

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
                <a href={notice.link} className="underline text-blue-500">{notice.linkText}</a>
            )}
            {notice.expirationDate && (
                <p className="mt-4 text-sm">
                    Expires on: {new Date(notice.expirationDate).toLocaleDateString("bn-BD")}
                </p>
            )}
            <p className="mt-2 font-bold">
                Priority: {notice.priority}
            </p>

            <div className="absolute top-4 right-4 flex space-x-2">
                <div className="flex items-center space-x-1 cursor-pointer" onClick={handleShowCompletedModal}>
                    <FaCheckCircle className="text-green-500" />
                    <span>Completed: {completedUsers.length}</span>
                </div>
                <div className="flex items-center space-x-1 cursor-pointer" onClick={handleShowNotCompletedModal}>
                    <FaTimesCircle className="text-red-500" />
                    <span>Incomplete: {notCompletedUsers.length}</span>
                </div>
                {notice.sendToAll ? (
                    <div className="flex items-center space-x-1">
                        <AiOutlineUsergroupAdd className="text-blue-500" />
                        <span>All</span>
                    </div>
                ) : (
                    <div className="flex items-center space-x-1 cursor-pointer" onClick={handleShowAssignedModal}>
                        <AiOutlineUsergroupAdd className="text-blue-500" />
                        <span>Assigned: {assignedUsers.length}</span>
                    </div>
                )}
            </div>

            {user && role === 'admin' && (
                <div className="absolute bottom-4 right-4 flex space-x-2">
                    <Link to={`/add-notice?id=${notice._id}`}>
                        <FaEdit className="text-blue-500 cursor-pointer" />
                    </Link>
                    <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDelete(notice)} />
                </div>
            )}

            <UserListModal
                showModal={showCompletedModal}
                handleCloseModal={handleCloseCompletedModal}
                title="Completed Users"
                users={completedUsers}
            />
            <UserListModal
                showModal={showNotCompletedModal}
                handleCloseModal={handleCloseNotCompletedModal}
                title="Incomplete Users"
                users={notCompletedUsers}
            />
            {!notice.sendToAll && (
                <UserListModal
                    showModal={showAssignedModal}
                    handleCloseModal={handleCloseAssignedModal}
                    title="Assigned Users"
                    users={assignedUsers}
                />
            )}
        </div>
    );
};

export default Notice;
