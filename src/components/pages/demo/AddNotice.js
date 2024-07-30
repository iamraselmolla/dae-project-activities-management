import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Datepicker from 'react-tailwindcss-datepicker';
import toast from 'react-hot-toast';

const AddNotice = () => {
    const formik = useFormik({
        initialValues: {
            subject: '',
            content: '',
            attachment: null,
            date: null,
            priority: 'Medium',
            notification: false,
            expirationDate: null,
            link: '',
            linkText: '',
        },
        validationSchema: Yup.object().shape({
            subject: Yup.string().required('বিষয় আবশ্যক').min(3, 'বিষয় ৩ অক্ষরের চেয়ে বড় হতে হবে').max(100, 'বিষয় ১০০ অক্ষরের চেয়ে ছোট হতে হবে'),
            content: Yup.string().required('বিবরণ আবশ্যক').min(10, 'বিবরণ ১০ অক্ষরের চেয়ে বড় হতে হবে'),
            date: Yup.date().required('তারিখ আবশ্যক'),
            attachment: Yup.mixed()
                .nullable()
                .test('fileSize', 'ফাইল খুব বড়', value => !value || (value && value.size <= 1048576))
                .test('fileType', 'অসমর্থিত ফাইল ফরম্যাট', value => !value || (value && ['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(value.type))),
        }),
        onSubmit: async (values, { resetForm }) => {
            // Handle form submission
            console.log('Form values:', values);
            toast.success('নোটিশ সফলভাবে জমা দেওয়া হয়েছে');
            resetForm();
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
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
                    {formik.touched.subject && formik.errors.subject ? <div className="text-red-600">{formik.errors.subject}</div> : null}
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

                <div>
                    <label htmlFor="date">তারিখ</label>
                    <Datepicker
                        id="date"
                        name="date"
                        value={formik.values.date}
                        onChange={val => formik.setFieldValue('date', val)}
                        showShortcuts={true}
                        asSingle={true}
                    />
                    {formik.touched.date && formik.errors.date ? <div className="text-red-600">{formik.errors.date}</div> : null}
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
                    {formik.touched.content && formik.errors.content ? <div className="text-red-600">{formik.errors.content}</div> : null}
                </div>

                <div className="col-span-2">
                    <label htmlFor="attachment">সংযুক্তি</label>
                    <input
                        type="file"
                        id="attachment"
                        name="attachment"
                        className="file-input file-input-bordered w-full"
                        onChange={(event) => formik.setFieldValue('attachment', event.currentTarget.files[0])}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.attachment && formik.errors.attachment ? <div className="text-red-600">{formik.errors.attachment}</div> : null}
                </div>

                <div className="col-span-2">
                    <label>
                        <input
                            type="checkbox"
                            name="notification"
                            className="checkbox"
                            onChange={formik.handleChange}
                            checked={formik.values.notification}
                        />
                        সকল ব্যবহারকারীদের নোটিফিকেশন পাঠান
                    </label>
                </div>
            </div>

            <button type="submit" className="btn btn-primary w-full">
                নোটিশ জমা দিন
            </button>
        </form>
    );
};

export default AddNotice;
