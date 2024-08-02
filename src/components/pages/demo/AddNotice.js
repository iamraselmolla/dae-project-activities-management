import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Datepicker from 'react-tailwindcss-datepicker';
import toast from 'react-hot-toast';
import SectionTitle from '../../shared/SectionTitle';
import axios from 'axios';
import { getAllUser } from '../../../services/userServices';

const AddNotice = () => {
    const [users, setUsers] = useState([]);
    const [sendToAll, setSendToAll] = useState(true);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [userFetching, setUserFetching] = useState(false);
    const [userActions, setUserActions] = useState([]);
    const [acknowledgmentOnly, setAcknowledgmentOnly] = useState(false);

    useEffect(() => {
        if (!sendToAll) {
            const fetchUsers = async () => {
                try {
                    setUserFetching(true);
                    const userResult = await getAllUser();
                    setUsers(userResult?.data?.data);
                } catch (error) {
                    console.error('Error fetching users', error);
                } finally {
                    setUserFetching(false);
                }
            };
            fetchUsers();
        }
    }, [sendToAll]);

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
                acknowledgmentOnly
            };
            try {
                await axios.post('/api/notices', noticeData);
                toast.success('নোটিশ সফলভাবে জমা দেওয়া হয়েছে');
                resetForm();
            } catch (error) {
                toast.error('নোটিশ জমা দেওয়া যায়নি');
                console.error('Error submitting notice', error);
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

    const handleCommentChange = (userId, comment) => {
        if (acknowledgmentOnly) return; // Do nothing if acknowledgment only
        setUserActions(prevActions => {
            const updatedActions = prevActions.map(action => {
                if (action.userId === userId) {
                    return {
                        ...action,
                        comments: [...action.comments, { text: comment }]
                    };
                }
                return action;
            });
            return updatedActions;
        });
    };

    const handleCompletionChange = (userId, completed) => {
        setUserActions(prevActions => {
            const updatedActions = prevActions.map(action => {
                if (action.userId === userId) {
                    return {
                        ...action,
                        completed
                    };
                }
                return action;
            });
            return updatedActions;
        });
    };

    return (
        <section className="mx-auto bg-white max-w-7xl px-2 sm:px-6 lg:px-8">
            <SectionTitle title={"নোটিশ যুক্ত করুন"} />
            <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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

                    <div>
                        <label htmlFor="expirationDate">মেয়াদ শেষ হওয়ার তারিখ</label>
                        <Datepicker
                            id="expirationDate"
                            name="expirationDate"
                            value={formik.values.expirationDate}
                            onChange={val => formik.setFieldValue('expirationDate', val)}
                            showShortcuts={true}
                            asSingle={true}
                        />
                        {formik.touched.expirationDate && formik.errors.expirationDate ? (
                            <div className="text-red-600">{formik.errors.expirationDate}</div>
                        ) : null}
                    </div>

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

                    <div>
                        <label htmlFor="priority">অগ্রাধিকার</label>
                        <select
                            id="priority"
                            name="priority"
                            className="select select-bordered w-full"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.priority}
                        >
                            <option value="High">উচ্চ</option>
                            <option value="Medium">মধ্যম</option>
                            <option value="Low">নিম্ন</option>
                        </select>
                        {formik.touched.priority && formik.errors.priority ? (
                            <div className="text-red-600">{formik.errors.priority}</div>
                        ) : null}
                    </div>

                    <div className="col-span-2 flex items-center justify-between space-x-4">
                        <div className="flex items-center">
                            <label htmlFor="sendToAll" className="mr-2">সকলকে পাঠান</label>
                            <input
                                type="checkbox"
                                id="sendToAll"
                                name="sendToAll"
                                className="toggle toggle-primary"
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    setSendToAll(e.target.checked);
                                }}
                                onBlur={formik.handleBlur}
                                checked={sendToAll}
                            />
                        </div>
                        <div className="flex items-center">
                            <label htmlFor="acknowledgmentOnly" className="mr-2">অগ্রগতির মন্তব্য বন্ধ রাখুন</label>
                            <input
                                type="checkbox"
                                id="acknowledgmentOnly"
                                name="acknowledgmentOnly"
                                className="toggle toggle-primary"
                                onChange={(e) => setAcknowledgmentOnly(e.target.checked)}
                                checked={acknowledgmentOnly}
                            />
                        </div>
                    </div>

                    {!sendToAll && (
                        <div className="col-span-2">
                            <label className='text-2xl font-bold mb-4'>নোটিশ পাঠানঃ</label>
                            {userFetching ? (
                                <p><span className="loading loading-spinner text-success"></span></p>
                            ) : (
                                users.map(user => (
                                    <label key={user._id} className="flex cursor-pointer mb-3 items-center">
                                        <input
                                            type="checkbox"
                                            value={user._id}
                                            data-username={user.username}
                                            onChange={handleUserSelection}
                                            className="checkbox checkbox-primary"
                                        />
                                        <span className="ml-2">{user.SAAO?.name + ', ' + user?.blockB}</span>
                                    </label>
                                ))
                            )}
                        </div>
                    )}
                </div>

                <button type="submit" className="btn theme-bg text-white w-full">
                    নোটিশ যুক্ত করুন
                </button>
            </form>
        </section>
    );
};

export default AddNotice;
