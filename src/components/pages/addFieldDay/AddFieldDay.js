import React, { useState } from 'react';
import SectionTitle from '../../shared/SectionTitle';
import { Field, useFormik } from 'formik';
import * as Yup from 'yup';
import Datepicker from 'react-tailwindcss-datepicker';
const { toBengaliNumber } = require('bengali-number');



const AddFieldDay = () => {
    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });

    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue);
        setValue(newValue);
    }
    const initialValues = {
        project: {
            full: '',
            short: ''
        },
        fiscalYear: '',
        season: '',
        subject: '',
        guests: '',
        farmers: {
            male: 0,
            female: 0,
        },
        date: '',
        images: [],

    };
    const validationSchema = Yup.object().shape({
        project: Yup.object().shape({
            full: Yup.string().required('প্রকল্প সিলেক্ট করুন'),
        }),
        season: Yup.string().required('মৌসুম সিলেক্ট করুন'),
        subject: Yup.string().required('মাঠদিবসের বিষয় সিলেক্ট করুন'),
        guests: Yup.string().required('উপস্থিত কর্মকর্তা ও অতিথিদের তালিকা দিন'),
        farmers: Yup.object().shape({
            male: Yup.number().min(0, 'Male farmers should be 0 or more').required('উপস্থিত পুরুষ কৃষক সংখ্যা'),
            female: Yup.number().min(0, 'Female farmers should be 0 or more').required('উপস্থিত নারী কৃষক সংখ্যা'),
        }),
        date: Yup.string().required('মাঠ দিবসের তারিখ'),
        images: Yup.array().min(1, 'মাঠ দিবসের ছবি দিন'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {

            // Handle form submission logic here
            console.log('Form values:', values);
        },
    });
    const getYear = new Date().getFullYear()


    return (
        <section className='container'>
            <SectionTitle title={'নতুন মাঠ দিবসের তথ্য যুক্ত করুন'} />
            <div className="mt-3">
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div>
                            <label className='font-extrabold mb-1 block'>প্রকল্পের পুরো নাম</label>
                            <select
                                className='input input-bordered w-full'
                                id="selectedOption"
                                name="selectedOption"
                            // value={selectedOption}
                            // onChange={handleSelectChange}
                            >
                                <option value="" label="প্রকল্প সিলেক্ট করুন" />
                                <option value="option1" label="Option 1" />
                                <option value="option2" label="Option 2" />
                                <option value="option3" label="Option 3" />
                            </select>
                        </div>
                        <div>
                            <label className='font-extrabold mb-1 block'>প্রকল্পের সংক্ষেপ নাম</label>
                            <input
                                type="text"
                                className='input input-bordered w-full'
                                id="name.details"
                                name="name.details"
                                onBlur={formik.handleBlur}
                                placeholder='প্রকল্পের সংক্ষেপ নাম'
                                value={formik.values.name ? formik.values.name.details : ''}
                            />
                            {formik.touched.name && formik.touched.name.details && formik.errors.name?.details ? (
                                <div className='text-red-600 font-bold'>{formik.errors.name.details}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className='font-extrabold mb-1 block'>অর্থবছর</label>
                            <select
                                className='input input-bordered w-full'
                                id="selectedOption"
                                name="selectedOption"
                            // value={selectedOption}
                            // onChange={handleSelectChange}
                            >
                                <option value="" label="অর্থবছর সিলেক্ট করুন" />
                                <option value={toBengaliNumber(`${getYear - 1}-${getYear}`)} label={toBengaliNumber(`${getYear - 1}-${getYear}`)} />
                                <option value={toBengaliNumber(`${getYear}-${getYear}`)} label={toBengaliNumber(`${getYear}-${getYear}`)} />
                                <option value={toBengaliNumber(`${getYear + 1}-${getYear + 2}`)} label={toBengaliNumber(`${getYear + 1}-${getYear + 2}`)} />

                            </select>
                        </div>
                        <div>
                            <label className='font-extrabold mb-1 block'>মৌসুম</label>
                            <select
                                className='input input-bordered w-full'
                                id="selectedOption"
                                name="selectedOption"
                            // value={selectedOption}
                            // onChange={handleSelectChange}
                            >
                                <option value="" label="মৌসুম সিলেক্ট করুন" />
                                <option value="রবি" label="রবি" />
                                <option value="খরিপ-১" label="খরিপ-১" />
                                <option value="খরিপ-২" label="খরিপ-২" />
                            </select>
                        </div>
                        <div>
                            <label className='font-extrabold mb-1 block'>বিষয়</label>
                            <input
                                type="text"
                                className='input input-bordered w-full'
                                id="name.details"
                                name="name.details"
                                onBlur={formik.handleBlur}
                                placeholder='মাঠদিবসের বিষয় বা ফসল'
                                value={formik.values.name ? formik.values.name.details : ''}
                            />
                            {formik.touched.name && formik.touched.name.details && formik.errors.name?.details ? (
                                <div className='text-red-600 font-bold'>{formik.errors.name.details}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className='font-extrabold mb-1 block'>উপস্থিত কর্মকর্তা ও গন্যমান্য অতিথি</label>
                            <input
                                type="text"
                                className='input input-bordered w-full'
                                id="name.details"
                                name="name.details"
                                onBlur={formik.handleBlur}
                                placeholder='কর্মকর্তা ও গন্যমান্য অতিথি'
                                value={formik.values.name ? formik.values.name.details : ''}
                            />
                            {formik.touched.name && formik.touched.name.details && formik.errors.name?.details ? (
                                <div className='text-red-600 font-bold'>{formik.errors.name.details}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className='font-extrabold mb-1 block'>উপস্থিত কৃষক (পুরুষ)</label>
                            <input
                                type="number"
                                className='input input-bordered w-full'
                                id="name.details"
                                name="name.details"
                                onBlur={formik.handleBlur}
                                placeholder='কৃষক (পুরুষ)'
                                value={formik.values.name ? formik.values.name.details : ''}
                            />
                            {formik.touched.name && formik.touched.name.details && formik.errors.name?.details ? (
                                <div className='text-red-600 font-bold'>{formik.errors.name.details}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className='font-extrabold mb-1 block'>উপস্থিত কৃষক (নারী)</label>
                            <input
                                type="number"
                                className='input input-bordered w-full'
                                id="name.details"
                                name="name.details"
                                onBlur={formik.handleBlur}
                                placeholder='কৃষক (নারী)'
                                value={formik.values.name ? formik.values.name.details : ''}
                            />
                            {formik.touched.name && formik.touched.name.details && formik.errors.name?.details ? (
                                <div className='text-red-600 font-bold'>{formik.errors.name.details}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className='font-extrabold mb-1 block'>মাঠদিবসের তারিখ</label>
                            <Datepicker
                                asSingle={true}
                                id="time"
                                name="time"
                                value={value}
                                showShortcuts={true}
                            />

                        </div>
                        <div>
                            <label className='font-extrabold mb-1 block'>মাঠ দিবসের ছবিসমূহ</label>
                            <input type="file" className="file-input input-bordered w-full" />

                        </div>



                    </div>






                    <button type='submit' className="btn mt-5 w-full font-extrabold text-white btn-success">প্রকল্প যুক্ত করুন</button>

                </form>
            </div>
        </section>
    );
};

export default AddFieldDay;