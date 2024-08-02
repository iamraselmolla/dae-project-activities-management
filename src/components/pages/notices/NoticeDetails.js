import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { findASingleNotice } from '../../../services/userServices';
import axios from 'axios';
import { AuthContext } from '../../AuthContext/AuthProvider';
import LoaderWithOutDynamicMessage from '../../shared/LoaderWithOutDynamicMessage';

const NoticeDetails = () => {
    const { id } = useParams();
    const [notice, setNotice] = useState(null);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [isCompleted, setIsCompleted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchNoticeDetails = async () => {
            try {
                setLoading(true);
                const response = await findASingleNotice(id);
                if (response?.status === 200) {
                    setNotice(response?.data?.data);
                    setComments(response.data?.data?.userActions);
                    setIsCompleted(response.data?.data?.userActions?.some(action => action.userId === user._id && action.completed));
                }
            } catch (error) {
                console.error('Error fetching notice details:', error);
                setError('Error fetching notice details.');
            } finally {
                setLoading(false);
            }
        };

        fetchNoticeDetails();
    }, [id, user]);

    const handleCommentSubmit = async () => {
        try {
            const response = await axios.post(`/api/notices/${id}/comments`, { text: comment });
            setComments([...comments, response.data]);
            setComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
            setError('Error adding comment.');
        }
    };

    const handleMarkAsComplete = async () => {
        try {
            await axios.post(`/api/notices/${id}/complete`);
            setIsCompleted(true);
        } catch (error) {
            console.error('Error marking notice as complete:', error);
            setError('Error marking notice as complete.');
        }
    };

    const canComment = notice?.sendToAll || notice?.recipients?.some(recipient => recipient.userId === user?._id);

    if (loading) return <LoaderWithOutDynamicMessage />;
    if (error) return <div>{error}</div>;

    return (
        <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="bg-white p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h1 className="text-2xl font-bold mb-4">{notice?.subject}</h1>
                    <p className="mb-4">{notice?.content}</p>
                    {notice?.link && (
                        <a href={notice?.link} className="underline mb-4 block">{notice?.linkText}</a>
                    )}
                    <p className="text-sm mb-6">Expires on: {new Date(notice?.expirationDate).toLocaleDateString()}</p>
                    {canComment && !isCompleted && (
                        <button
                            onClick={handleMarkAsComplete}
                            className="mt-4 bg-green-500 text-white px-4 py-2 rounded flex items-center hover:bg-green-600"
                        >
                            Mark as Complete
                        </button>
                    )}
                    {isCompleted && (
                        <p className="mt-4 text-green-500 font-bold">This notice is marked as complete.</p>
                    )}
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-2">Comments</h2>
                    <div className="mb-4 max-h-60 overflow-y-auto">
                        {comments.map((action, index) => (
                            <div key={index} className="mb-2 p-2 border rounded">
                                <p><strong>{action.username}</strong>: {action.comments.map(comment => comment.text).join(', ')}</p>
                            </div>
                        ))}
                    </div>
                    {canComment && (
                        <>
                            <textarea
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                                className="w-full p-2 border rounded mb-4"
                                placeholder="Add a comment..."
                            />
                            <button
                                onClick={handleCommentSubmit}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Submit
                            </button>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default NoticeDetails;
