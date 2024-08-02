import React, { useState, useEffect } from 'react';
import SectionTitle from '../../shared/SectionTitle';
import AddModuleButton from '../../shared/AddModuleButton';
import { getAllNotices } from '../../../services/userServices';
import LoaderWithOutDynamicMessage from '../../shared/LoaderWithOutDynamicMessage';
import AssignedRecipientsModal from '../../shared/AssignedRecipientsModal';
import Notice from './Notice';


const Notices = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRecipients, setSelectedRecipients] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
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
                {notices.map(notice => <Notice key={notice?._id} handleShowRecipients={handleShowRecipients} notice={notice} />)}
            </div>
            {loading && <LoaderWithOutDynamicMessage />}
            {showModal && <AssignedRecipientsModal recipients={selectedRecipients} onClose={() => setShowModal(false)} />}
        </section>
    );
};

export default Notices;
