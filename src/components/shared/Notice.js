import React, { useState, useContext } from 'react';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FaCheckCircle, FaTimesCircle, FaEdit, FaTrash, FaUserSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import UserListModal from './UserListModal';
import { AuthContext } from '../AuthContext/AuthProvider';
import toast from 'react-hot-toast';
import { deleteNotice } from '../../services/userServices';
import { useDispatch, useSelector } from 'react-redux';
import { daeAction } from '../store/projectSlice';
import { createRandomNumber } from "../utilis/createRandomNumber";

const priorityClasses = {
    High: 'bg-red-100 border-red-500 text-red-800',
    Medium: 'bg-yellow-100 border-yellow-500 text-yellow-800',
    Low: 'bg-green-100 border-green-500 text-green-800',
};

const Notice = ({ notice }) => {
    const [showAssignedModal, setShowAssignedModal] = useState(false);
    const [showCompletedModal, setShowCompletedModal] = useState(false);
    const [showNotCompletedModal, setShowNotCompletedModal] = useState(false);
    const [showInactiveModal, setShowInactiveModal] = useState(false);
    const { user, role } = useContext(AuthContext);
    const dispatch = useDispatch();
    const { blockAndUnions: allUsers } = useSelector(state => state.dae);

    const handleDelete = async (noticeId) => {
        try {
            const result = await deleteNotice(noticeId);
            if (result?.status === 200) {
                toast.success(result?.data?.message);
                dispatch(daeAction.setRefetch(`notices${createRandomNumber()}`));
            }
        } catch (err) {
            toast.error("নোটিশ মুছতে অসুবিধা হয়েছে।");
        }
    };

    let inActiveUsers = [];
    if (notice?.sendToAll) {
        const completedAndNotCompletedUserIds = [...(notice.completedUsers || []), ...(notice.notCompletedUsers || [])]
            .map(action => action.userId._id.toString());
        inActiveUsers = allUsers
            .filter(user => !completedAndNotCompletedUserIds.includes(user._id.toString()))
            .map(user => ({
                userId: {
                    _id: user._id,
                    SAAO: { name: user?.SAAO?.name },
                    blockB: user?.blockB
                }
            }));
    } else {
        const completedAndNotCompletedUserIds = [...(notice.completedUsers || []), ...(notice.notCompletedUsers || [])]
            .map(action => action.userId._id.toString());
        inActiveUsers = (notice.recipients || [])
            .filter(user => !completedAndNotCompletedUserIds.includes(user.userId.toString()));
    }

    return (
        <>
            <div
                key={notice._id}
                className={`relative p-6 rounded-lg shadow-md border-l-4 ${priorityClasses[notice.priority]}`}
            >
                <Link to={`/notices/${notice._id}`} className="text-xl font-semibold mb-2 block hover:underline">
                    {notice.subject}
                </Link>
                <p className="mb-3 text-gray-700">{notice.content}</p>
                {notice.link && (
                    <a href={notice.link} className="text-blue-600 hover:underline">{notice.linkText}</a>
                )}
                {notice.expirationDate && (
                    <p className="mt-4 text-sm text-gray-600">
                        Expires on: {new Date(notice.expirationDate).toLocaleDateString("bn-BD")}
                    </p>
                )}
                <p className="mt-2 font-semibold text-gray-800">
                    Priority: {notice.priority}
                </p>

                <div className="absolute top-3 right-3 flex flex-col space-y-2">
                    <FaCheckCircle
                        className="text-green-500 cursor-pointer text-xl"
                        title="Mark as Completed"
                        onClick={() => setShowCompletedModal(true)}
                    />
                    <FaTimesCircle
                        className="text-red-500 cursor-pointer text-xl"
                        title="Mark as Not Completed"
                        onClick={() => setShowNotCompletedModal(true)}
                    />
                    <FaUserSlash
                        className="text-gray-500 cursor-pointer text-xl"
                        title="Show Inactive Users"
                        onClick={() => setShowInactiveModal(true)}
                    />
                    {notice.sendToAll ? (
                        <span className="text-xs bg-green-500 text-white py-1 px-2 rounded-full">All</span>
                    ) : (
                        <AiOutlineUsergroupAdd
                            className="text-blue-500 cursor-pointer text-xl"
                            title="Show Assigned Users"
                            onClick={() => setShowAssignedModal(true)}
                        />
                    )}
                </div>

                {user && role === 'admin' && (
                    <div className="absolute bottom-3 right-3 flex space-x-3">
                        <Link to={`/add-notice?id=${notice._id}`} className="text-blue-500 hover:text-blue-700" title="Edit Notice">
                            <FaEdit className="text-xl" />
                        </Link>
                        <FaTrash
                            className="text-red-500 cursor-pointer text-xl"
                            title="Delete Notice"
                            onClick={() => handleDelete(notice._id)}
                        />
                    </div>
                )}
            </div>

            {/* Modals */}
            <UserListModal
                showModal={showAssignedModal}
                handleCloseModal={() => setShowAssignedModal(false)}
                title="সংযুক্ত ব্লক ও সংশ্লিষ্ট উপসহকারী কৃষি কর্মকর্তাগণঃ"
                users={notice.recipients}
            />
            <UserListModal
                showModal={showCompletedModal}
                handleCloseModal={() => setShowCompletedModal(false)}
                title="সম্পন্ন ব্যবহারকারী"
                users={notice.completedUsers}
            />
            <UserListModal
                showModal={showNotCompletedModal}
                handleCloseModal={() => setShowNotCompletedModal(false)}
                title="অসম্পন্ন ব্যবহারকারী"
                users={notice.notCompletedUsers}
            />
            <UserListModal
                showModal={showInactiveModal}
                handleCloseModal={() => setShowInactiveModal(false)}
                title="নিষ্ক্রিয় ব্যবহারকারী"
                users={inActiveUsers}
            />
        </>
    );
};

export default Notice;
