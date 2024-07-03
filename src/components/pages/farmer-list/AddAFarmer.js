import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

const AddAFarmer = () => {
    const [nid, setNid] = useState('');
    const validationSchema = Yup.object().shape({
        farmersInfo: Yup.object().shape({
            farmerName: Yup.string().required('কৃষকের নাম দিন'),
            fathersOrHusbandsName: Yup.string(),
        }),
        numbersInfo: Yup.object().shape({
            mobile: Yup.string()
                .required('মোবাইল নম্বর দিন')
                .matches(/^[0-9]{11}$/, 'মোবাইল নম্বরটি সঠিক নয়'), NID: Yup.string().test(
                    'nid-validation',
                    'এনআইডি নম্বরটি সঠিক নয়',
                    function (value) {
                        if (value?.trim() === '') return true;
                        return /^(10|13|17)$/.test(value);
                    }
                ),
            BID: Yup.string(),
            agriId: Yup.string(),
        }),
        address: Yup.object().shape({
            village: Yup.string().required('গ্রামের নাম দিন'),
            block: Yup.string(),
            union: Yup.string(),
        }),
        SAAO: Yup.object().shape({
            saaoName: Yup.string(),
            saaoMobile: Yup.string(),
        }),
        comment: Yup.string(),
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
                block: '',
                union: '',
            },
            SAAO: {
                saaoName: '',
                saaoMobile: '',
            },
            comment: '',
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                // Replace with your API call
                const result = null
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
                        <label className="font-extrabold mb-1 block">
                            পিতার বা স্বামীর নাম
                        </label>
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
                    </div>
                    <div>
                        <label className="font-extrabold mb-1 block">মোবাইল নম্বর</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            id="numbersInfo.mobile"
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
                            onChange={(e) => {
                                formik.handleChange(e);
                                setNid(e.target.value);
                            }}
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
                            value={formik.values.address.block}
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
                            value={formik.values.address.union}
                        />
                    </div>
                    <div>
                        <label className="font-extrabold mb-1 block">সার্ভার নাম</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            id="SAAO.saaoName"
                            name="SAAO.saaoName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="সার্ভার নাম"
                            value={formik.values.SAAO.saaoName}
                        />
                    </div>
                    <div>
                        <label className="font-extrabold mb-1 block">সার্ভার মোবাইল</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            id="SAAO.saaoMobile"
                            name="SAAO.saaoMobile"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="সার্ভার মোবাইল"
                            value={formik.values.SAAO.saaoMobile}
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
