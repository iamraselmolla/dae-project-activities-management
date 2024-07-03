import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

const AddAFarmer = () => {
    const [nid, setNid] = useState('');
    const validationSchema = Yup.object().shape({
        farmerName: Yup.string().required('কৃষকের নাম দিন'),
        fathersOrHusbandsName: Yup.string(),
        mobile: Yup.string()
            .required('মোবাইল নম্বর দিন')
            .matches(/^[0-9]{11}$/, 'মোবাইল নম্বরটি সঠিক নয়'),
        NID: Yup.string()
            .nullable()
            .when('NID', {
                is: (value) => value?.trim() !== '',
                then: Yup.string().matches(/^(10|13|17)$/, 'এনআইডি নম্বরটি সঠিক নয়'),
            }),
        BID: Yup.string(),
        agriId: Yup.string(),
        village: Yup.string().required('গ্রামের নাম দিন'),
        block: Yup.string(),
        union: Yup.string(),
        saaoName: Yup.string(),
        saaoMobile: Yup.string(),
        comment: Yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            farmerName: '',
            fathersOrHusbandsName: '',
            mobile: '',
            NID: '',
            BID: '',
            agriId: '',
            village: '',
            block: '',
            union: '',
            saaoName: '',
            saaoMobile: '',
            comment: '',
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                // Replace with your API call
                const result = await yourApiFunction(values);
                if (result?.status === 200) {
                    toast.success('Draft item added successfully');
                } else {
                    toast.error('Failed to add draft item');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                resetForm();
            }
        },
    });

    return (
        <section className="container px-4 md:px-0">
            <h1 className="text-2xl font-bold mb-4">নতুন খসড়া আইটেম যুক্ত করুন</h1>
            <form className="bg-white py-5 px-6 rounded-xl" onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div>
                        <label className="font-extrabold mb-1 block">কৃষকের নাম</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            id="farmerName"
                            name="farmerName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="কৃষকের নাম"
                            value={formik.values.farmerName}
                        />
                        {formik.touched.farmerName && formik.errors.farmerName ? (
                            <div className="text-red-600 font-bold">{formik.errors.farmerName}</div>
                        ) : null}
                    </div>
                    <div>
                        <label className="font-extrabold mb-1 block">
                            পিতার বা স্বামীর নাম
                        </label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            id="fathersOrHusbandsName"
                            name="fathersOrHusbandsName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="পিতার বা স্বামীর নাম"
                            value={formik.values.fathersOrHusbandsName}
                        />
                    </div>
                    <div>
                        <label className="font-extrabold mb-1 block">মোবাইল নম্বর</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            id="mobile"
                            name="mobile"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="মোবাইল নম্বর"
                            value={formik.values.mobile}
                        />
                        {formik.touched.mobile && formik.errors.mobile ? (
                            <div className="text-red-600 font-bold">{formik.errors.mobile}</div>
                        ) : null}
                    </div>
                    <div>
                        <label className="font-extrabold mb-1 block">এনআইডি নম্বর</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            id="NID"
                            name="NID"
                            onChange={(e) => {
                                formik.handleChange(e);
                                setNid(e.target.value);
                            }}
                            onBlur={formik.handleBlur}
                            placeholder="এনআইডি নম্বর"
                            value={formik.values.NID}
                        />
                        {formik.touched.NID && formik.errors.NID ? (
                            <div className="text-red-600 font-bold">{formik.errors.NID}</div>
                        ) : null}
                    </div>
                    <div>
                        <label className="font-extrabold mb-1 block">বিআইডি নম্বর</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            id="BID"
                            name="BID"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="বিআইডি নম্বর"
                            value={formik.values.BID}
                        />
                    </div>
                    <div>
                        <label className="font-extrabold mb-1 block">কৃষি আইডি নম্বর</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            id="agriId"
                            name="agriId"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="কৃষি আইডি নম্বর"
                            value={formik.values.agriId}
                        />
                    </div>
                    <div>
                        <label className="font-extrabold mb-1 block">গ্রামের নাম</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            id="village"
                            name="village"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="গ্রামের নাম"
                            value={formik.values.village}
                        />
                        {formik.touched.village && formik.errors.village ? (
                            <div className="text-red-600 font-bold">{formik.errors.village}</div>
                        ) : null}
                    </div>
                    <div>
                        <label className="font-extrabold mb-1 block">ব্লক নাম</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            id="block"
                            name="block"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="ব্লক নাম"
                            value={formik.values.block}
                        />
                    </div>
                    <div>
                        <label className="font-extrabold mb-1 block">ইউনিয়নের নাম</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            id="union"
                            name="union"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="ইউনিয়নের নাম"
                            value={formik.values.union}
                        />
                    </div>
                    <div>
                        <label className="font-extrabold mb-1 block">সার্ভার নাম</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            id="saaoName"
                            name="saaoName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="সার্ভার নাম"
                            value={formik.values.saaoName}
                        />
                    </div>
                    <div>
                        <label className="font-extrabold mb-1 block">সার্ভার মোবাইল</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            id="saaoMobile"
                            name="saaoMobile"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="সার্ভার মোবাইল"
                            value={formik.values.saaoMobile}
                        />
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
                </div>
                <button
                    type="submit"
                    className="btn mt-5 w-full font-extrabold text-white btn-success"
                >
                    খসড়া আইটেম যুক্ত করুন
                </button>
            </form>
        </section>
    );
};

export default AddAFarmer;
