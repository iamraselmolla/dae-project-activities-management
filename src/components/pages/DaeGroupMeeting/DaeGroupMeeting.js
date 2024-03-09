import React, { useState } from 'react';
import SectionTitle from '../../shared/SectionTitle';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Datepicker from 'react-tailwindcss-datepicker';
import { format } from 'date-fns';
import { bn } from 'date-fns/locale';
import toast from 'react-hot-toast';
import { FaTimes } from 'react-icons/fa';

const DaeGroupMeeting = () => {
    const [images, setImages] = useState([]);

    const initialValues = {
        groupInfo: {
            name: '',
            place: '',
            mobile: ''
        },
        date: '',
        address: {
            village: '',
            block: '',
            union: '',
        },
        SAAO: {
            name: '',
            mobile: ''
        },
        discussion: '',
        presentOfficers: '',
        images: [],
        username: '',
    };

    const validationSchema = Yup.object({
        groupInfo: Yup.object({
            name: Yup.string().required('কৃষক গ্রুপের নাম প্রয়োজন'),
            place: Yup.string().required('স্থানের নাম দিন'),
            mobile: Yup.string()
                .required("মোবাইল নম্বর দিন")
                .matches(/^[0-9]{11}$/, "মোবাইল নম্বর ১১ টি সংখ্যার হতে হবে")
        }),
        address: Yup.object({
            village: Yup.string().required('গ্রামের নাম দিন'),
            block: Yup.string().required('ব্লকের নাম দিন'),
            union: Yup.string().required('ইউনিয়নের নাম দিন'),
        }),
        SAAO: Yup.object({
            name: Yup.string().required('এসএএও নাম দিন'),
            mobile: Yup.string().required('এসএএও মোবাইল নম্বর দিন'),
        }),
        discussion: Yup.string().required('আলোচ্য বিষয় দিন'),
        images: Yup.array().required('অন্তত একটি ছবি আপ্লোড দিন'),
    });



    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        const imagesArray = files.map((file) => URL.createObjectURL(file));
        setImages((prevImages) => prevImages.concat(imagesArray));
        formik.setFieldValue('images', [...formik.values.images, ...files]);
    };
    const handleRemoveImage = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
        formik.setFieldValue('images', updatedImages);
    };
    const renderImages = () => {
        return (
            <div>
                <h3 className="font-bold mb-2">ছবি প্রিভিউ</h3>
                <div className="flex gap-3">
                    {images.map((image, index) => (
                        <div key={index} className="relative">
                            <img
                                src={image}
                                alt={`Image ${index + 1}`}
                                className="w-32 border-success border-4 h-32 mr-2 mb-2 object-cover"
                            />
                            <button
                                type="button"
                                className="absolute flex justify-center items-center w-6 h-6 rounded-full bg-red-700 top-0 right-0 text-white hover:text-green-300"
                                onClick={() => handleRemoveImage(index)}
                            >
                                <FaTimes />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const handleDateChange = (date) => {
        formik.setFieldValue('date', date);
    };

    const formatDate = (date) => {
        const dayName = format(new Date(date.startDate), 'EEEE', { locale: bn });
        if (dayName === 'শুক্রবার' || dayName === 'শনিবার') {
            toast.error('আপনি সাপ্তাহিক ছুটির দিনে গ্রুপ সভার তারিখ সিলেক্ট করেছেন!');
        }

        return dayName
    };
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            // Here you can send the form data to the server
            console.log(values);
        },
    });

    return (
        <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <SectionTitle title={"ডিএই কৃষক গ্রুপ সভার তথ্য যুক্ত করুন"} />
            <div className="mt-2">
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                        <div>
                            <label className="font-extrabold mb-1 block">
                                কৃষক গ্রুপের নাম
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                id="groupInfo.name"
                                name="groupInfo.name"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder="কৃষক গ্রুপের নাম"
                                value={formik.values.groupInfo.name}
                            />
                            {formik.touched.groupInfo?.name && formik.errors.groupInfo?.name ? (
                                <div className="text-red-600">{formik.errors.groupInfo.name}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className="font-extrabold mb-1 block">
                                স্থান
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                id="groupInfo.place"
                                name="groupInfo.place"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder="স্থান"
                                value={formik.values.groupInfo.place}
                            />
                            {formik.touched.groupInfo?.place && formik.errors.groupInfo?.place ? (
                                <div className="text-red-600">{formik.errors.groupInfo.place}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className="font-extrabold mb-1 block">
                                মোবাইল
                            </label>
                            <input
                                type="number"
                                className="input input-bordered w-full"
                                id="groupInfo.mobile"
                                name="groupInfo.mobile"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder="মোবাইল"
                                value={formik.values.groupInfo.mobile}
                            />
                            {formik.touched.groupInfo?.mobile && formik.errors.groupInfo?.mobile ? (
                                <div className="text-red-600">{formik.errors.groupInfo.mobile}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className="font-extrabold mb-1 block">
                                গ্রাম
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                id="address.village"
                                name="address.village"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder="গ্রাম"
                                value={formik.values.address.village}
                            />
                            {formik.touched.address?.village && formik.errors.address?.village ? (
                                <div className="text-red-600">{formik.errors.address?.village}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className="font-extrabold mb-1 block">
                                ব্লক
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                id="address.block"
                                name="address.block"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder="ব্লক"
                                value={formik.values.address.block}
                            />
                            {formik.touched.address?.block && formik.errors.address?.block ? (
                                <div className="text-red-600">{formik.errors.address?.block}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className="font-extrabold mb-1 block">
                                ইউনিয়ন
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                id="address.union"
                                name="address.union"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder="ইউনিয়ন"
                                value={formik.values.address.union}
                            />
                            {formik.touched.address?.union && formik.errors.address?.union ? (
                                <div className="text-red-600">{formik.errors.address?.union}</div>
                            ) : null}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 my-5 gap-4 lg:grid-cols-2">
                        <div>
                            <label className="font-extrabold mb-1 block">সভার তারিখ</label>
                            <div className="input input-bordered w-full">
                                <Datepicker
                                    asSingle={true}
                                    onChange={handleDateChange}
                                    // dateFormat="dd/MM/yyyy"
                                    value={formik.values.date}
                                />
                                {formik.touched.date && formik.errors.date ? (
                                    <div className="text-red-600">{formik.errors.date}</div>
                                ) : null}
                            </div>
                        </div>
                        <div>
                            {/* Display day name in Bangla */}
                            {formik.values.date && (
                                <div>
                                    <label className="font-extrabold mb-1 block">সভার তারিখের দিন</label>
                                    <div className="input input-bordered w-full">
                                        {formatDate(formik.values.date)}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="font-extrabold mb-1 block">
                            আলোচ্য বিষয়
                        </label>
                        <textarea
                            className="input h-32 input-bordered w-full"
                            id="discussion"
                            name="discussion"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            placeholder="আলোচ্য বিষয়"
                            value={formik.values.discussion}
                        />
                        {formik.touched.discussion && formik.errors.discussion ? (
                            <div className="text-red-600">{formik.errors.discussion}</div>
                        ) : null}
                    </div>
                    <div className='mt-5'>
                        <label className="font-extrabold mb-1 block">
                            উপস্থিত কর্মকর্তা
                        </label>
                        <input
                            className="input input-bordered w-full"
                            id="presentOfficers"
                            name="presentOfficers"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            placeholder="উপস্থিত কর্মকর্তা"
                            value={formik.values.presentOfficers}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 my-5 lg:grid-cols-2">
                        <div>
                            <label className="font-extrabold mb-1 block">
                                এসএএও এর নাম
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                id="SAAO.name"
                                name="SAAO.name"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder="এসএএও নাম"
                                value={formik.values.SAAO.name}
                            />
                            {formik.touched.SAAO?.name && formik.errors.SAAO?.name ? (
                                <div className="text-red-600">{formik.errors.SAAO?.name}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className="font-extrabold mb-1 block">
                                এসএএও এর মোবাইল
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                id="SAAO.mobile"
                                name="SAAO.mobile"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder="এসএএও মোবাইল"
                                value={formik.values.SAAO.mobile}
                            />
                            {formik.touched.SAAO?.mobile && formik.errors.SAAO?.mobile ? (
                                <div className="text-red-600">{formik.errors.SAAO?.mobile}</div>
                            ) : null}
                        </div>
                    </div>
                    <div>
                        <label className="font-extrabold mb-1 block">
                            কৃষক গ্রুপ সভার ছবি/ ছবি সমূহ
                        </label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="input"
                        />
                        {formik.touched.images && formik.errors.images ? (
                            <div className="text-red-600">{formik.errors.images}</div>
                        ) : null}
                        <div className="mt-4">

                            <div className="">{renderImages()}</div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn mt-5 w-full font-extrabold text-white btn-success"
                    >
                        কৃষক গ্রুপ সভার তথ্য যুক্ত করুন
                    </button>

                </form >
            </div >
        </section >
    );
};

export default DaeGroupMeeting;
