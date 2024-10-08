import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { FaUser, FaPhone, FaIdCard, FaAddressCard, FaMapMarkerAlt, FaBuilding } from 'react-icons/fa';

const AddFarmerHelpData = () => {
    const { blockAndUnions: users } = useSelector(state => state.dae);
    const [saaoInfo, setSaaoInfo] = useState({ name: '', mobile: '' });

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            address: '',
            block: '',
            union: '',
            numbers: {
                mobile: '',
                nid: '',
                agriCard: ''
            },
            saaoName: '',
            saaoMobile: ''
        },
        validationSchema: Yup.object().shape({
            title: Yup.string().required('শিরোনাম আবশ্যক'),
            description: Yup.string().required('বিবরণ আবশ্যক'),
            address: Yup.string().required('ঠিকানা আবশ্যক'),
            block: Yup.string().required('ব্লক আবশ্যক'),
            union: Yup.string().required('ইউনিয়ন আবশ্যক'),
            numbers: Yup.object().shape({
                mobile: Yup.string().required('মোবাইল নম্বর আবশ্যক'),
                nid: Yup.string().required('এনআইডি আবশ্যক'),
                agriCard: Yup.string().required('কৃষি কার্ড আবশ্যক')
            })
        }),
        onSubmit: async (values) => {
            try {
                console.log('ফর্ম জমা দেওয়া হয়েছে:', values);
                toast.success('ফর্ম সফলভাবে জমা দেওয়া হয়েছে!');
            } catch (error) {
                console.error('ফর্ম জমা দিতে ত্রুটি:', error);
                toast.error('ফর্ম জমা দিতে ব্যর্থ হয়েছে');
            }
        },
    });

    useEffect(() => {
        if (formik.values.block) {
            const selectedBlock = users.find(user => user.blockB === formik.values.block);
            if (selectedBlock) {
                setSaaoInfo({
                    name: selectedBlock.SAAO?.name,
                    mobile: selectedBlock.SAAO?.mobile
                });
                formik.setFieldValue('saaoName', selectedBlock.SAAO?.name);
                formik.setFieldValue('saaoMobile', selectedBlock.SAAO?.mobile);
            } else {
                setSaaoInfo({ name: '', mobile: '' });
                formik.setFieldValue('saaoName', '');
                formik.setFieldValue('saaoMobile', '');
            }
        }
    }, [formik.values.block, users]);

    return (
        <div className="card bg-base-100 shadow-xl max-w-4xl mx-auto">
            <div className="card-body">
                <h2 className="card-title text-2xl font-bold text-center mb-6">কৃষক সহায়তা তথ্য যোগ করুন</h2>
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="form-control">
                            <label className="label" htmlFor="title">
                                <span className="label-text">শিরোনাম</span>
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="input input-bordered"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.title}
                            />
                            {formik.touched.title && formik.errors.title && <p className="text-error text-sm mt-1">{formik.errors.title}</p>}
                        </div>

                        <div className="form-control">
                            <label className="label" htmlFor="description">
                                <span className="label-text">বিবরণ</span>
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                className="textarea textarea-bordered h-24"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.description}
                            />
                            {formik.touched.description && formik.errors.description && <p className="text-error text-sm mt-1">{formik.errors.description}</p>}
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label" htmlFor="address">
                            <span className="label-text">ঠিকানা</span>
                        </label>
                        <div className="input-group">
                            <span className="input-group-addon"><FaMapMarkerAlt /></span>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                className="input input-bordered w-full"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address}
                            />
                        </div>
                        {formik.touched.address && formik.errors.address && <p className="text-error text-sm mt-1">{formik.errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="form-control">
                            <label className="label" htmlFor="block">
                                <span className="label-text">ব্লক</span>
                            </label>
                            <select
                                id="block"
                                name="block"
                                className="select select-bordered w-full"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.block}
                            >
                                <option value="">ব্লক নির্বাচন করুন</option>
                                {users?.map((user) => (
                                    <option key={user.blockB} value={user.blockB}>{user.blockB}</option>
                                ))}
                            </select>
                            {formik.touched.block && formik.errors.block && <p className="text-error text-sm mt-1">{formik.errors.block}</p>}
                        </div>

                        <div className="form-control">
                            <label className="label" htmlFor="union">
                                <span className="label-text">ইউনিয়ন</span>
                            </label>
                            <div className="input-group">
                                <span className="input-group-addon"><FaBuilding /></span>
                                <input
                                    type="text"
                                    id="union"
                                    name="union"
                                    className="input input-bordered w-full"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.union}
                                />
                            </div>
                            {formik.touched.union && formik.errors.union && <p className="text-error text-sm mt-1">{formik.errors.union}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        <div className="form-control">
                            <label className="label" htmlFor="mobile">
                                <span className="label-text">মোবাইল</span>
                            </label>
                            <div className="input-group">
                                <span className="input-group-addon"><FaPhone /></span>
                                <input
                                    type="text"
                                    id="mobile"
                                    name="numbers.mobile"
                                    className="input input-bordered w-full"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.numbers.mobile}
                                />
                            </div>
                            {formik.touched.numbers?.mobile && formik.errors.numbers?.mobile && <p className="text-error text-sm mt-1">{formik.errors.numbers.mobile}</p>}
                        </div>

                        <div className="form-control">
                            <label className="label" htmlFor="nid">
                                <span className="label-text">এনআইডি</span>
                            </label>
                            <div className="input-group">
                                <span className="input-group-addon"><FaIdCard /></span>
                                <input
                                    type="text"
                                    id="nid"
                                    name="numbers.nid"
                                    className="input input-bordered w-full"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.numbers.nid}
                                />
                            </div>
                            {formik.touched.numbers?.nid && formik.errors.numbers?.nid && <p className="text-error text-sm mt-1">{formik.errors.numbers.nid}</p>}
                        </div>

                        <div className="form-control">
                            <label className="label" htmlFor="agriCard">
                                <span className="label-text">কৃষি কার্ড</span>
                            </label>
                            <div className="input-group">
                                <span className="input-group-addon"><FaAddressCard /></span>
                                <input
                                    type="text"
                                    id="agriCard"
                                    name="numbers.agriCard"
                                    className="input input-bordered w-full"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.numbers.agriCard}
                                />
                            </div>
                            {formik.touched.numbers?.agriCard && formik.errors.numbers?.agriCard && <p className="text-error text-sm mt-1">{formik.errors.numbers.agriCard}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="form-control">
                            <label className="label" htmlFor="saaoName">
                                <span className="label-text">এসএএও নাম</span>
                            </label>
                            <div className="input-group">
                                <span className="input-group-addon"><FaUser /></span>
                                <input
                                    type="text"
                                    id="saaoName"
                                    name="saaoName"
                                    className="input input-bordered w-full bg-base-200"
                                    value={saaoInfo.name || ''}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label" htmlFor="saaoMobile">
                                <span className="label-text">এসএএও মোবাইল</span>
                            </label>
                            <div className="input-group">
                                <span className="input-group-addon"><FaPhone /></span>
                                <input
                                    type="text"
                                    id="saaoMobile"
                                    name="saaoMobile"
                                    className="input input-bordered w-full bg-base-200"
                                    value={saaoInfo.mobile || ''}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary">জমা দিন</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddFarmerHelpData;