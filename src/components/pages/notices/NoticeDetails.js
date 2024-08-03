// src/NoticeDetails.js
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    findASingleNotice,
    addCommentToNotice,
    markNoticeAsCompleted
} from '../../../services/userServices';
import LoaderWithOutDynamicMessage from '../../shared/LoaderWithOutDynamicMessage';
import NoContentFound from '../../shared/NoContentFound';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import UserListModal from '../../shared/UserListModal';
import { AuthContext } from '../../AuthContext/AuthProvider';

const NoticeDetails = () => {
    const { id } = useParams();
    const [notice, setNotice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showCompletedModal, setShowCompletedModal] = useState(false);
    const [showNotCompletedModal, setShowNotCompletedModal] = useState(false);
    const [comment, setComment] = useState('');
    const { user } = useContext(AuthContext);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const result = await findASingleNotice(id);
                if (result?.status === 200) {
                    setNotice(result.data?.data);
                }
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };
        fetchNotice();
    }, [id, reload]);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmitComment = async () => {
        try {
            const result = await addCommentToNotice(id, user?._id, user?.username, comment);
            if (result?.status === 200) {
                setNotice(result.data?.data);
                setComment('');
                setReload(!reload);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleMarkAsCompleted = async () => {
        try {
            const result = await markNoticeAsCompleted(id);
            if (result?.status === 200) {
                setNotice(result.data?.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return <LoaderWithOutDynamicMessage />;
    }

    if (!loading && !notice) {
        return <NoContentFound text={"নোটিশ পাওয়া যায়নি"} />;
    }

    const completedUsers = notice?.userActions?.filter(action => action.completed) || [];
    const notCompletedUsers = notice?.userActions?.filter(action => !action.completed) || [];

    const handleShowCompletedModal = () => setShowCompletedModal(true);
    const handleCloseCompletedModal = () => setShowCompletedModal(false);

    const handleShowNotCompletedModal = () => setShowNotCompletedModal(true);
    const handleCloseNotCompletedModal = () => setShowNotCompletedModal(false);

    return (
        <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">{notice.subject}</h2>
                <p className="mb-4">{notice.content}</p>
                {notice.link && (
                    <a href={notice.link} className="underline text-blue-500">{notice.linkText}</a>
                )}
                <p className="mt-4 text-sm text-gray-500">মেয়াদ শেষের তারিখ: {new Date(notice.expirationDate).toLocaleDateString("bn-BD")}</p>
                <div className="mt-4 flex space-x-2">
                    <div className="flex items-center space-x-1 cursor-pointer" onClick={handleShowCompletedModal}>
                        <FaCheckCircle className="text-green-500" />
                        <span>সম্পন্ন: {completedUsers.length}</span>
                    </div>
                    <div className="flex items-center space-x-1 cursor-pointer" onClick={handleShowNotCompletedModal}>
                        <FaTimesCircle className="text-red-500" />
                        <span>অসম্পন্ন: {notCompletedUsers.length}</span>
                    </div>
                </div>
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">ব্যবহারকারীর কার্যক্রম</h3>
                    <ul>
                        {notice.userActions.map((action, index) => (
                            <li
                                key={index}
                                className={`mb-2 p-4 rounded ${action.completed ? 'bg-green-100' : 'bg-red-100'}`}
                            >
                                <p>{action.username} - {action.completed ? 'সম্পন্ন' : 'অসম্পন্ন'}</p>
                                {action.comments.map((comment, idx) => (
                                    <div key={idx} className="ml-4 text-sm text-gray-700">
                                        <p>{comment.text}</p>
                                        <p className="text-xs text-gray-500">{new Date(comment.date).toLocaleDateString("bn-BD")}</p>
                                    </div>
                                ))}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mt-6">
                    {(notice.sendToAll || notice.recipients.some(recipient => recipient.userId === user?._id)) && (
                        <>
                            <textarea
                                className="w-full border rounded p-2 mb-4"
                                placeholder="কাজের অগ্রগতি যুক্ত করুন"
                                value={comment}
                                onChange={handleCommentChange}
                            ></textarea>
                            <div className="flex justify-between">
                                <button
                                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                                    onClick={handleSubmitComment}
                                    type="button"
                                >
                                    কাজের অগ্রগতি জানান
                                </button>
                                <button
                                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                                    onClick={handleMarkAsCompleted}
                                >
                                    সম্পন্ন হিসেবে জমা দিন
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <UserListModal
                showModal={showCompletedModal}
                handleCloseModal={handleCloseCompletedModal}
                title="সম্পন্ন ব্যবহারকারী"
                users={completedUsers}
            />
            <UserListModal
                showModal={showNotCompletedModal}
                handleCloseModal={handleCloseNotCompletedModal}
                title="অসম্পন্ন ব্যবহারকারী"
                users={notCompletedUsers}
            />
        </section>
    );
};

export default NoticeDetails;
