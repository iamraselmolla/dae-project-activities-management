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
            emergencyStatus: '',
            priority: 'Medium',
            notification: false,
            expirationDate: null,
            tags: '',
            visibility: 'Public',
        },
        validationSchema: Yup.object().shape({
            subject: Yup.string().required('Subject is required').min(3).max(100),
            content: Yup.string().required('Content is required').min(10),
            date: Yup.date().required('Date is required'),
            emergencyStatus: Yup.string().required('Emergency status is required'),
            attachment: Yup.mixed()
                .nullable()
                .test('fileSize', 'File too large', value => !value || (value && value.size <= 1048576))
                .test('fileType', 'Unsupported File Format', value => !value || (value && ['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(value.type))),
        }),
        onSubmit: async (values, { resetForm }) => {
            // Handle form submission
            console.log('Form values:', values);
            toast.success('Notice submitted successfully');
            resetForm();
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="subject">Subject</label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="input input-bordered w-full"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.subject}
                />
                {formik.touched.subject && formik.errors.subject ? <div className="text-red-600">{formik.errors.subject}</div> : null}
            </div>

            <div>
                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    name="content"
                    className="textarea textarea-bordered w-full"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.content}
                />
                {formik.touched.content && formik.errors.content ? <div className="text-red-600">{formik.errors.content}</div> : null}
            </div>

            <div>
                <label htmlFor="attachment">Attachment</label>
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

            <div>
                <label htmlFor="date">Date</label>
                <Datepicker
                    id="date"
                    name="date"
                    value={formik.values.date}
                    onChange={val => formik.setFieldValue('date', val)}
                    showShortcuts={true}
                />
                {formik.touched.date && formik.errors.date ? <div className="text-red-600">{formik.errors.date}</div> : null}
            </div>

            <div>
                <label htmlFor="emergencyStatus">Emergency Status</label>
                <select
                    id="emergencyStatus"
                    name="emergencyStatus"
                    className="select select-bordered w-full"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.emergencyStatus}
                >
                    <option value="">Select status</option>
                    <option value="Very Urgent">Very Urgent</option>
                    <option value="Not Hurry">Not Hurry</option>
                    <option value="Keep Note">Keep Note</option>
                </select>
                {formik.touched.emergencyStatus && formik.errors.emergencyStatus ? <div className="text-red-600">{formik.errors.emergencyStatus}</div> : null}
            </div>

            <div>
                <label htmlFor="priority">Priority</label>
                <select
                    id="priority"
                    name="priority"
                    className="select select-bordered w-full"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.priority}
                >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>

            <div>
                <label>
                    <input
                        type="checkbox"
                        name="notification"
                        className="checkbox"
                        onChange={formik.handleChange}
                        checked={formik.values.notification}
                    />
                    Send notification to all users
                </label>
            </div>

            <div>
                <label htmlFor="expirationDate">Expiration Date</label>
                <Datepicker
                    id="expirationDate"
                    name="expirationDate"
                    value={formik.values.expirationDate}
                    onChange={val => formik.setFieldValue('expirationDate', val)}
                    showShortcuts={true}
                />
            </div>

            <div>
                <label htmlFor="tags">Tags</label>
                <input
                    type="text"
                    id="tags"
                    name="tags"
                    className="input input-bordered w-full"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.tags}
                />
            </div>

            <div>
                <label htmlFor="visibility">Visibility</label>
                <select
                    id="visibility"
                    name="visibility"
                    className="select select-bordered w-full"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.visibility}
                >
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                    <option value="Restricted">Restricted</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary w-full">
                Submit Notice
            </button>
        </form>
    );
};

export default AddNotice;
