import React, { useState, useContext } from 'react';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FaCheckCircle, FaTimesCircle, FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import UserListModal from './UserListModal';
import { AuthContext } from '../AuthContext/AuthProvider';
import toast from 'react-hot-toast';

const priorityClasses = {
    High: 'bg-red-100 border-red-500',
    Medium: 'bg-yellow-100 border-yellow-500',
    Low: 'bg-green-100 border-green-500',
};

const Notice = ({ notice, onDelete }) => {
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

    const handleDelete = async (noticeId) => {
        try {
            await onDelete(noticeId);
            toast.success("নোটিশ সফলভাবে মুছে ফেলা হয়েছে।");
        } catch (err) {
            toast.error("নোটিশ মুছতে অসুবিধা হয়েছে।");
        }
    };

    return (
        <div
            key={notice._id}
            className={`relative p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 border ${priorityClasses[notice.priority]}`}
        >
            <Link to={`/notice-details/${notice._id}`} className="text-xl font-bold mb-2">
                {notice.subject}
            </Link>
            <p className="mb-2">{notice.content}</p>
            {notice.link && (
                <a href={notice.link} className="underline">{notice.linkText}</a>
            )}
            {notice.expirationDate && (
                <p className="mt-4 text-sm">
                    Expires on: {new Date(notice.expirationDate).toLocaleDateString("bn-BD")}
                </p>
            )}
            <p className="mt-2 font-bold">
                Priority: {notice.priority}
            </p>

            <div className="absolute top-4 right-4 flex flex-col items-center space-y-2">
                <FaCheckCircle
                    className="text-green-500 cursor-pointer text-xl"
                    onClick={handleShowCompletedModal}
                />
                <FaTimesCircle
                    className="text-red-500 cursor-pointer text-xl"
                    onClick={handleShowNotCompletedModal}
                />
                {notice.sendToAll ? (
                    <span className="text-xs bg-green-500 text-white py-1 px-2 rounded">All</span>
                ) : (
                    <AiOutlineUsergroupAdd
                        className="text-blue-500 cursor-pointer text-xl"
                        onClick={handleShowAssignedModal}
                    />
                )}
            </div>

            {user && role === 'admin' && (
                <div className="absolute bottom-4 right-4 flex space-x-2">
                    <Link to={`/edit-notice/${notice._id}`}>
                        <FaEdit className="text-blue-500 cursor-pointer text-xl" />
                    </Link>
                    <FaTrash
                        className="text-red-500 cursor-pointer text-xl"
                        onClick={() => handleDelete(notice._id)}
                    />
                </div>
            )}

            <UserListModal
                showModal={showAssignedModal}
                handleCloseModal={handleCloseAssignedModal}
                title="সংযুক্ত ব্লক ও সংশ্লিষ্ট উপসহকারী কৃষি কর্মকর্তাগণঃ"
                users={notice.recipients}
            />
            <UserListModal
                showModal={showCompletedModal}
                handleCloseModal={handleCloseCompletedModal}
                title="সম্পন্ন ব্যবহারকারী"
                users={notice.completedUsers}
            />
            <UserListModal
                showModal={showNotCompletedModal}
                handleCloseModal={handleCloseNotCompletedModal}
                title="অসম্পন্ন ব্যবহারকারী"
                users={notice.notCompletedUsers}
            />
        </div>
    );
};

export default Notice;
