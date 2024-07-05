import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import SectionTitle from '../../shared/SectionTitle';
import { AuthContext } from '../../AuthContext/AuthProvider';
import { createAFarmer } from '../../../services/userServices';

const AddAFarmer = () => {
    const { user } = useContext(AuthContext)
    const validationSchema = Yup.object().shape({
        farmersInfo: Yup.object().shape({
            farmerName: Yup.string().required('কৃষকের নাম দিন'),
            fathersOrHusbandsName: Yup.string().required('পিতা/স্বামীর নাম দিন'),
        }),
        numbersInfo: Yup.object().shape({
            mobile: Yup.string()
                .required('মোবাইল নম্বর দিন')
                .matches(/^[0-9]{11}$/, 'মোবাইল নম্বরটি সঠিক নয়'),
            NID:
                Yup.string()
                    .test(
                        'nid-validation',
                        'এনআইডি নম্বরটি সঠিক নয়',
                        function (value) {
                            if (value?.trim() === '') return true;
                            return /^(?:\d{10}|\d{13}|\d{17})$/.test(value);
                        }
                    )
            // BID: Yup.string(),
            // agriId: Yup.string(),
        }),
        address: Yup.object().shape({
            village: Yup.string().required('গ্রামের নাম দিন'),
            block: Yup.string('ব্লকের নাম দিন'),
            union: Yup.string('ইউনিয়নের নাম দিন'),
        }),
        // comment: Yup.string(),

    });

    const formik = useFormik({
        initialValues: {
            farmersInfo: {
                farmerName: '',
                fathersOrHusbandsName: '',
            },
            numbersInfo: {
                mobile: '',
                NID: '',
                BID: '',
                agriId: '',
            },
            address: {
                village: '',
                block: user?.blockB,
                union: user?.unionB,
            },
            comment: '',
            username: user?.username
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                // Replace with your API call
                const result = await createAFarmer(values);
                if (result?.status === 200) {
                    toast.success(result?.data?.message);
                } else {
                    toast.error('কৃষকের তথ্য যুক্ত করতে সমস্যা হচ্ছে।');
                }
            } catch (error) {
                toast.error("সার্ভারজনিত সমস্যা হচ্ছে । দয়া করে সংশ্লিষ্ট কর্তৃপক্ষকে অবহিত করুন।")
                console.error('Error:', error);
            } finally {
                resetForm();
            }
        },
    });

    return (
        <section className="mx-auto bg-white max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="bg-white">
                <SectionTitle title={'কৃষক তথ্য যোগ করুন'} />
                <form className="px-6 mt-6 rounded-xl" onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div>
                            <label className="font-extrabold mb-1 block">কৃষকের নাম</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                id="farmersInfo.farmerName"
                                name="farmersInfo.farmerName"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="কৃষকের নাম"
                                value={formik.values.farmersInfo.farmerName}
                            />
                            {formik.touched.farmersInfo?.farmerName && formik.errors.farmersInfo?.farmerName ? (
                                <div className="text-red-600 font-bold">{formik.errors.farmersInfo.farmerName}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className="font-extrabold mb-1 block">পিতার বা স্বামীর নাম</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                id="farmersInfo.fathersOrHusbandsName"
                                name="farmersInfo.fathersOrHusbandsName"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="পিতার বা স্বামীর নাম"
                                value={formik.values.farmersInfo.fathersOrHusbandsName}
                            />
                            {formik.touched.farmersInfo?.fathersOrHusbandsName && formik.errors.farmersInfo?.fathersOrHusbandsName ? (
                                <div className="text-red-600 font-bold">{formik.errors.farmersInfo.fathersOrHusbandsName}</div>
                            ) : null}
                        </div>

                    </div>
                    <div className="grid my-3 gap-3 lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
                        <div>
                            <label className="font-extrabold mb-1 block">মোবাইল নম্বর</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                id="numbersInfo.mobile"
                                maxLength={11}
                                name="numbersInfo.mobile"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="মোবাইল নম্বর"
                                value={formik.values.numbersInfo.mobile}
                            />
                            {formik.touched.numbersInfo?.mobile && formik.errors.numbersInfo?.mobile ? (
                                <div className="text-red-600 font-bold">{formik.errors.numbersInfo.mobile}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className="font-extrabold mb-1 block">এনআইডি নম্বর</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                id="numbersInfo.NID"
                                name="numbersInfo.NID"
                                maxLength={17}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="এনআইডি নম্বর"
                                value={formik.values.numbersInfo.NID}
                            />
                            {formik.touched.numbersInfo?.NID && formik.errors.numbersInfo?.NID ? (
                                <div className="text-red-600 font-bold">{formik.errors.numbersInfo.NID}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className="font-extrabold mb-1 block">বিআইডি নম্বর</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                id="numbersInfo.BID"
                                name="numbersInfo.BID"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="বিআইডি নম্বর"
                                value={formik.values.numbersInfo.BID}
                            />
                        </div>
                        <div>
                            <label className="font-extrabold mb-1 block">কৃষি আইডি নম্বর</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                id="numbersInfo.agriId"
                                name="numbersInfo.agriId"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="কৃষি আইডি নম্বর"
                                value={formik.values.numbersInfo.agriId}
                            />
                        </div>
                    </div>
                    <div className="grid gap-4 my-3 lg:grid-cols-3 md:grid-cols-3 grid-cols-1">
                        <div>
                            <label className="font-extrabold mb-1 block">গ্রামের নাম</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                id="address.village"
                                name="address.village"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="গ্রামের নাম"
                                value={formik.values.address.village}
                            />
                            {formik.touched.address?.village && formik.errors.address?.village ? (
                                <div className="text-red-600 font-bold">{formik.errors.address.village}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className="font-extrabold mb-1 block">ব্লক নাম</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                id="address.block"
                                name="address.block"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="ব্লক নাম"
                                value={user?.blockB}
                                disabled={true}
                            />
                        </div>
                        <div>
                            <label className="font-extrabold mb-1 block">ইউনিয়নের নাম</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                id="address.union"
                                name="address.union"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="ইউনিয়নের নাম"
                                value={user?.unionB}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="font-extrabold mb-1 block">মন্তব্য</label>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            id="comment"
                            name="comment"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="মন্তব্য"
                            value={formik.values.comment}
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="btn mt-5 w-full font-extrabold text-white btn-success"
                    >
                        খসড়া আইটেম যুক্ত করুন
                    </button>
                </form>
            </div>
        </section>
    );
};

export default AddAFarmer;
