import React, { useState, useEffect } from 'react';
import SectionTitle from '../../shared/SectionTitle';
import AddModuleButton from '../../shared/AddModuleButton';
import { Link } from 'react-router-dom';
import { getAllNotices } from '../../../services/userServices';
import LoaderWithOutDynamicMessage from '../../shared/LoaderWithOutDynamicMessage';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import AssignedRecipientsModal from '../../shared/AssignedRecipientsModal';

const priorityColors = {
    High: 'bg-red-500 text-white',
    Medium: 'bg-yellow-500 text-black',
    Low: 'bg-green-500 text-black'
};

const Notices = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRecipients, setSelectedRecipients] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                setLoading(true);
                const result = await getAllNotices();
                if (result?.status === 200) {
                    setNotices(result?.data.data);
                }
            } catch (error) {
                console.error('Error fetching notices:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotices();
    }, []);

    const handleShowRecipients = (recipients) => {
        setSelectedRecipients(recipients);
        setShowModal(true);
    };

    return (
        <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="text-center font-extrabold mb-6">
                <SectionTitle title="সকল নোটিশ" />
            </div>
            <div className="text-right mb-4">
                <AddModuleButton link="add-notice" btnText="নোটিশ যুক্ত করুন" />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {notices.map(notice => (
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
                            <p className="mt-4 text-sm">Expires on: {new Date(notice.expirationDate).toLocaleDateString()}</p>
                        </Link>
                        <div className="absolute top-4 right-4">
                            {notice.sendToAll ? (
                                <span className="text-xs bg-green-500 text-white py-1 px-2 rounded">All</span>
                            ) : (
                                <AiOutlineUsergroupAdd
                                    className="text-2xl cursor-pointer"
                                    onClick={() => handleShowRecipients(notice.recipients)}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {loading && <LoaderWithOutDynamicMessage />}
            {showModal && <AssignedRecipientsModal recipients={selectedRecipients} onClose={() => setShowModal(false)} />}
        </section>
    );
};

export default Notices;
