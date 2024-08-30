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
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import UserListModal from '../../shared/UserListModal';
import { AuthContext } from '../../AuthContext/AuthProvider';
import { toBengaliNumber } from 'bengali-number';
import toast from 'react-hot-toast';
import SmallLoader from '../../shared/SmallLoader';

const NoticeDetails = () => {
    const { id } = useParams();
    const [notice, setNotice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [commentLoading, setCommentLoading] = useState(false); // New state for comment loading
    const [completeLoading, setCompleteLoading] = useState(false); // New state for complete loading
    const [showCompletedModal, setShowCompletedModal] = useState(false);
    const [showNotCompletedModal, setShowNotCompletedModal] = useState(false);
    const [showAssignedModal, setShowAssignedModal] = useState(false);
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
            setCommentLoading(true); // Set comment loading state
            const result = await addCommentToNotice(id, user?._id, user?.username, comment);
            if (result?.status === 200) {
                setNotice(result.data?.data);
                setComment('');
                toast.success('মন্তব্য সফলভাবে যুক্ত করা হয়েছে।');
            }
        } catch (err) {
            console.error(err);
            toast.error('মন্তব্য যুক্ত করতে অসুবিধা হয়েছে।');
        } finally {
            setCommentLoading(false); // End comment loading state
        }
    };

    const handleMarkAsCompleted = async () => {
        try {
            setCompleteLoading(true); // Set complete loading state
            const result = await markNoticeAsCompleted(id, user?._id, user?.username);
            if (result?.status === 200) {
                setReload(!reload);
                toast.success(result?.data?.message);
            }
        } catch (err) {
            toast.error("আপনার নোটিশের কর্ম সম্পাদন হিসেবে চিহ্নিত করতে অসুবিধার সৃষ্টি হচ্ছে।");
        } finally {
            setCompleteLoading(false); // End complete loading state
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
    const assignedUsers = notice?.recipients || [];
    const userAction = notice?.userActions?.find(action => action.userId === user?._id);

    const handleShowCompletedModal = () => setShowCompletedModal(true);
    const handleCloseCompletedModal = () => setShowCompletedModal(false);

    const handleShowNotCompletedModal = () => setShowNotCompletedModal(true);
    const handleCloseNotCompletedModal = () => setShowNotCompletedModal(false);

    const handleShowAssignedModal = () => setShowAssignedModal(true);
    const handleCloseAssignedModal = () => setShowAssignedModal(false);

    return (
        <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 relative">
            {(commentLoading || completeLoading) && <SmallLoader />} {/* Show loader if loading */}
            <div className={`bg-white p-6 rounded-lg shadow-lg ${commentLoading || completeLoading ? 'opacity-50 pointer-events-none' : ''}`}>
                <h2 className="text-2xl font-bold mb-4">{notice.subject}</h2>
                <p className="mb-4">{notice.content}</p>
                {notice.link && (
                    <a href={notice.link} className="underline text-blue-500">{notice.linkText}</a>
                )}
                {notice.expirationDate && <p className="mt-4 text-sm text-gray-500">মেয়াদ শেষের তারিখ: {new Date(notice.expirationDate).toLocaleDateString("bn-BD")}</p>}
                <div className="mt-4 flex space-x-2">
                    <div className="flex items-center space-x-1 cursor-pointer" onClick={handleShowCompletedModal}>
                        <FaCheckCircle className="text-green-500" />
                        <span>সম্পন্ন: {toBengaliNumber(completedUsers.length)}</span>
                    </div>
                    <div className="flex items-center space-x-1 cursor-pointer" onClick={handleShowNotCompletedModal}>
                        <FaTimesCircle className="text-red-500" />
                        <span>অসম্পন্ন: {toBengaliNumber(notCompletedUsers.length)}</span>
                    </div>
                    {notice.sendToAll ? (
                        <div className="flex items-center space-x-1">
                            <AiOutlineUsergroupAdd className="text-blue-500" />
                            <span>সকল</span>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-1 cursor-pointer" onClick={handleShowAssignedModal}>
                            <AiOutlineUsergroupAdd className="text-blue-500" />
                            <span>নির্ধারিত: {toBengaliNumber(assignedUsers.length)}</span>
                        </div>
                    )}
                </div>
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">কর্মের অগ্রগতি মন্তব্য</h3>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {notice.userActions.map((action, index) => (
                            <div
                                key={index}
                                className={`p-4 rounded ${action.completed ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'}`}
                            >
                                <p>{action.userId?.SAAO?.name} - {action.completed ? 'সম্পন্ন' : 'অসম্পন্ন'}</p>
                                <p>ব্লক: {action.userId?.blockB}</p>
                                {action.comments.map((comment, idx) => (
                                    <div key={idx} className="mt-2 text-sm text-gray-700">
                                        <p>{comment.text}</p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(comment.date).toLocaleDateString("bn-BD", {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-6">
                    {userAction && userAction.completed ? (
                        <div className="bg-green-100 p-4 rounded text-center">
                            <p className="text-green-700 font-semibold">আপনি এই কাজটি সম্পন্ন করেছেন। ধন্যবাদ!</p>
                        </div>
                    ) : (notice.sendToAll || notice.recipients.some(recipient => recipient.userId === user?._id)) && (
                        <>
                            <textarea
                                className="w-full border rounded p-2 mb-4"
                                placeholder="কাজের অগ্রগতি যুক্ত করুন"
                                value={comment}
                                onChange={handleCommentChange}
                            ></textarea>
                            <div className="flex justify-between">
                                <button
                                    className="theme-bg text-white py-2 px-4 rounded hover:bg-blue-700"
                                    onClick={handleSubmitComment}
                                    type="button"
                                    disabled={commentLoading || completeLoading} // Disable button if loading
                                >
                                    কাজের অগ্রগতি জানান
                                </button>
                                <button
                                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                                    onClick={handleMarkAsCompleted}
                                    disabled={commentLoading || completeLoading} // Disable button if loading
                                >
                                    সম্পন্ন হিসেবে জমা দিন
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <UserListModal
                isOpen={showCompletedModal}
                onClose={handleCloseCompletedModal}
                userList={completedUsers}
                title="সম্পন্ন করেছেন"
            />
            <UserListModal
                isOpen={showNotCompletedModal}
                onClose={handleCloseNotCompletedModal}
                userList={notCompletedUsers}
                title="অসম্পন্ন"
            />
            <UserListModal
                isOpen={showAssignedModal}
                onClose={handleCloseAssignedModal}
                userList={assignedUsers}
                title="নির্ধারিত ব্যবহারকারী"
            />
        </section>
    );
};

export default NoticeDetails;
