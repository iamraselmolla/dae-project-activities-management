import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Datepicker from 'react-tailwindcss-datepicker';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import SectionTitle from '../../shared/SectionTitle';
import { createANotice, findASingleNotice, updateNotice } from '../../../services/userServices';
import { useSelector } from 'react-redux';

const AddNotice = () => {
    const { blockAndUnions: users } = useSelector(state => state.dae);
    const [sendToAll, setSendToAll] = useState(true);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [userActions, setUserActions] = useState([]);
    const [actionThread, setActionThread] = useState(false);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const noticeId = new URLSearchParams(location.search).get('id');


    useEffect(() => {
        if (noticeId) {
            const fetchNoticeData = async () => {
                try {
                    setLoading(true);
                    const result = await findASingleNotice(noticeId);
                    const noticeData = result?.data?.data;
                    formik.setValues({
                        subject: noticeData.subject,
                        content: noticeData.content,
                        linkText: noticeData.linkText || '',
                        link: noticeData.link || '',
                        expirationDate: noticeData.expirationDate ? { startDate: noticeData.expirationDate } : null,
                        attachment: null, // Handle file separately
                        priority: noticeData.priority || 'Medium',
                    });
                    setSendToAll(noticeData.sendToAll);
                    setSelectedUsers(noticeData.recipients || []);
                    setUserActions(noticeData.userActions || []);
                    setActionThread(noticeData.actionThread || false);
                } catch (error) {
                    toast.error('নোটিশ তথ্য আনতে ব্যর্থ হয়েছে');
                    console.error('Error fetching notice data', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchNoticeData();
        }
    }, [noticeId]);

    const formik = useFormik({
        initialValues: {
            subject: '',
            content: '',
            linkText: '',
            link: '',
            expirationDate: null,
            attachment: null,
            priority: 'Medium',
        },
        validationSchema: Yup.object().shape({
            subject: Yup.string()
                .required('বিষয় আবশ্যক')
                .min(3, 'বিষয় ৩ অক্ষরের চেয়ে বড় হতে হবে')
                .max(100, 'বিষয় ১০০ অক্ষরের চেয়ে ছোট হতে হবে'),
            content: Yup.string()
                .required('বিবরণ আবশ্যক')
                .min(10, 'বিবরণ ১০ অক্ষরের চেয়ে বড় হতে হবে'),
        }),
        onSubmit: async (values, { resetForm }) => {
            if (!sendToAll && selectedUsers.length === 0) {
                toast.error('অনুগ্রহ করে কমপক্ষে একজন ব্যবহারকারী নির্বাচন করুন');
                return;
            }
            const noticeData = {
                ...values,
                sendToAll,
                recipients: sendToAll ? [] : selectedUsers,
                userActions,
                actionThread
            };
            try {
                setLoading(true);
                let result;
                if (noticeId) {
                    // Update existing notice
                    result = await updateNotice(noticeId, noticeData);
                } else {
                    // Create new notice
                    result = await createANotice(noticeData);
                }
                if (result?.status === 200) {
                    toast.success(result?.data?.message);
                    resetForm();
                    navigate('/notices');
                }
            } catch (error) {
                toast.error(noticeId ? 'নোটিশ হালনাগাদ করা যায়নি' : 'নোটিশ যুক্ত করা যায়নি');
                console.error('Error submitting notice', error);
            } finally {
                setLoading(false);
            }
        },
    });

    const handleUserSelection = (e) => {
        const userId = e.target.value;
        const username = e.target.dataset.username;
        if (e.target.checked) {
            setSelectedUsers([...selectedUsers, { userId, username }]);
        } else {
            setSelectedUsers(selectedUsers.filter(user => user.userId !== userId));
        }
    };
    return (
        <section className="mx-auto bg-white max-w-7xl px-2 sm:px-6 lg:px-8">
            <SectionTitle title={noticeId ? "নোটিশ হালনাগাদ করুন" : "নোটিশ যুক্ত করুন"} />
            <form onSubmit={formik.handleSubmit} className="space-y-4">
                {/* Form Fields */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Subject Field */}
                    <div className="col-span-2">
                        <label htmlFor="subject">বিষয়</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            className="input input-bordered w-full"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.subject}
                            placeholder="নোটিশের বিষয় লিখুন"
                        />
                        {formik.touched.subject && formik.errors.subject ? (
                            <div className="text-red-600">{formik.errors.subject}</div>
                        ) : null}
                    </div>
                    {/* Content Field */}
                    <div className="col-span-2">
                        <label htmlFor="content">বিবরণ</label>
                        <textarea
                            id="content"
                            name="content"
                            className="textarea textarea-bordered w-full"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.content}
                            placeholder="নোটিশের বিবরণ লিখুন"
                        />
                        {formik.touched.content && formik.errors.content ? (
                            <div className="text-red-600">{formik.errors.content}</div>
                        ) : null}
                    </div>
                    {/* Link Text */}
                    <div>
                        <label htmlFor="linkText">লিংক টেক্সট</label>
                        <input
                            type="text"
                            id="linkText"
                            name="linkText"
                            className="input input-bordered w-full"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.linkText}
                            placeholder="লিংকের টেক্সট লিখুন"
                        />
                    </div>
                    {/* Link */}
                    <div>
                        <label htmlFor="link">লিংক</label>
                        <input
                            type="text"
                            id="link"
                            name="link"
                            className="input input-bordered w-full"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.link}
                            placeholder="নোটিশের লিংক লিখুন"
                        />
                    </div>
                    {/* Expiration Date */}
                    <div>
                        <label htmlFor="expirationDate">মেয়াদ শেষ হওয়ার তারিখ</label>
                        <Datepicker
                            id="expirationDate"
                            name="expirationDate"
                            value={formik.values.expirationDate}
                            onChange={val => formik.setFieldValue('expirationDate', val?.startDate)}
                            showShortcuts={true}
                            asSingle={true}
                        />
                        {formik.touched.expirationDate && formik.errors.expirationDate ? (
                            <div className="text-red-600">{formik.errors.expirationDate}</div>
                        ) : null}
                    </div>
                    {/* Attachment */}
                    <div>
                        <label htmlFor="attachment">সংযুক্তি</label>
                        <input
                            type="file"
                            id="attachment"
                            name="attachment"
                            className="file-input file-input-bordered w-full"
                            onChange={(event) => formik.setFieldValue('attachment', event.currentTarget.files[0])}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.attachment && formik.errors.attachment ? (
                            <div className="text-red-600">{formik.errors.attachment}</div>
                        ) : null}
                    </div>
                    {/* Priority */}
                    <div>
                        <label htmlFor="priority">প্রাধান্য</label>
                        <select
                            id="priority"
                            name="priority"
                            className="select select-bordered w-full"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.priority}
                        >
                            <option value="Low">কম</option>
                            <option value="Medium">মাঝারি</option>
                            <option value="High">উচ্চ</option>
                        </select>
                    </div>
                </div>
                {/* Send to All */}
                <div className="flex items-center space-x-4">
                    <input
                        type="checkbox"
                        id="sendToAll"
                        checked={sendToAll}
                        onChange={() => setSendToAll(!sendToAll)}
                        className="checkbox"
                    />
                    <label htmlFor="sendToAll">সকলকে প্রেরণ করুন</label>
                </div>
                {/* Select Users */}
                {!sendToAll && (
                    <div>
                        <label>ব্যবহারকারী নির্বাচন করুন</label>
                        {
                            <div className="grid mt-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                {users?.map(user => (
                                    <div key={user._id} className="flex gap-3 items-center">
                                        <input
                                            type="checkbox"
                                            id={user._id}
                                            value={user._id}
                                            data-username={user.username}
                                            onChange={handleUserSelection}
                                            className="checkbox"
                                            checked={selectedUsers.some(selectedUser => selectedUser?.userId === user._id)}
                                        />
                                        <label htmlFor={user._id} className="ml-2">{user?.blockB + ", " + user?.SAAO?.name}</label>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                )}
                {/* Action Thread */}
                <div className="flex items-center space-x-4">
                    <input
                        type="checkbox"
                        id="actionThread"
                        checked={actionThread}
                        onChange={() => setActionThread(!actionThread)}
                        className="checkbox"
                    />
                    <label htmlFor="actionThread">অ্যাকশন থ্রেড সক্রিয় করুন</label>
                </div>
                {/* Submit Button */}
                <div>
                    <button type="submit" className="btn theme-bg text-white w-full">
                        {loading ? 'অপেক্ষা করুন...' : noticeId ? 'নোটিশ হালনাগাদ করুন' : 'নোটিশ যুক্ত করুন'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AddNotice;
