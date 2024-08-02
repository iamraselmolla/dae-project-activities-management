import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const NoticeDetails = () => {
    const { id } = useParams();
    const [notice, setNotice] = useState(null);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get(`/api/notices/${id}`)
            .then(response => {
                setNotice(response.data);
                setComments(response.data.userActions);
            })
            .catch(error => console.error('Error fetching notice details:', error));
    }, [id]);

    const handleCommentSubmit = () => {
        axios.post(`/api/notices/${id}/comments`, { text: comment })
            .then(response => {
                setComments([...comments, response.data]);
                setComment('');
            })
            .catch(error => console.error('Error adding comment:', error));
    };

    if (!notice) return <div>Loading...</div>;

    return (
        <section className="mx-auto max-w-4xl px-2 sm:px-6 lg:px-8">
            <motion.div
                className="bg-white p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-2xl font-bold mb-4">{notice.subject}</h1>
                <p className="mb-4">{notice.content}</p>
                {notice.link && (
                    <a href={notice.link} className="underline mb-4 block">{notice.linkText}</a>
                )}
                <p className="text-sm mb-6">Expires on: {new Date(notice.expirationDate).toLocaleDateString()}</p>
                <div>
                    <h2 className="text-xl font-bold mb-2">Comments</h2>
                    <div className="mb-4">
                        {comments.map((action, index) => (
                            <div key={index} className="mb-2">
                                <p><strong>{action.username}</strong>: {action.comments.text}</p>
                            </div>
                        ))}
                    </div>
                    <textarea
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        className="w-full p-2 border rounded mb-4"
                        placeholder="Add a comment..."
                    />
                    <button
                        onClick={handleCommentSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Submit
                    </button>
                </div>
            </motion.div>
        </section>
    );
};

export default NoticeDetails;
