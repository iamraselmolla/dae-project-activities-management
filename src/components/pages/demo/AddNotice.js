import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Datepicker from 'react-tailwindcss-datepicker';
import toast from 'react-hot-toast';
import SectionTitle from '../../shared/SectionTitle';
import { getAllUser } from '../../../services/userServices';

const AddNotice = () => {
    const [users, setUsers] = useState([]);
    const [sendToAll, setSendToAll] = useState(true);
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        if (!sendToAll) {
            const fetchUsers = async () => {
                try {
                    const userResult = await getAllUser();
                    setUsers(userResult?.data?.data);
                } catch (error) {
                    console.error('Error fetching users', error);
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
            notification: false,
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
                recipients: sendToAll ? 'all' : selectedUsers,
            };
            console.log('Form values:', noticeData);
            toast.success('নোটিশ সফলভাবে জমা দেওয়া হয়েছে');
            resetForm();
        },
    });

    const handleUserSelection = (e) => {
        const userId = e.target.value;
        if (e.target.checked) {
            setSelectedUsers([...selectedUsers, userId]);
        } else {
            setSelectedUsers(selectedUsers.filter(id => id !== userId));
        }
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
                            <option value="Medium">মাঝারি</option>
                            <option value="Low">নিম্ন</option>
                        </select>
                    </div>

                    {sendToAll && <div className="col-span-2">
                        <label>
                            <input
                                type="checkbox"
                                name="sendToAll"
                                className="checkbox"
                                checked={sendToAll}
                                onChange={() => setSendToAll(!sendToAll)}
                            />
                            সকল ব্যবহারকারীদের নোটিশ পাঠান
                        </label>
                    </div>}

                    {!sendToAll && (
                        <div className="col-span-2">
                            <label>নোটিশ পাঠানঃ </label>
                            <div className="flex gap-2 mt-3 flex-wrap">
                                {users.map(user => (
                                    <label key={user._id} className="flex py-3 border-2 theme-border px-2 rounded-lg items-center mr-4 mb-2">
                                        <input
                                            type="checkbox"
                                            value={user._id}
                                            onChange={handleUserSelection}
                                            className="checkbox mr-2"
                                        />
                                        {`${user.blockB}, ${user.unionB}, ${user.SAAO.name}`}
                                    </label>
                                ))}
                            </div>
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
