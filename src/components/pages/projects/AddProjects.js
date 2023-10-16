import { useFormik } from 'formik';
import React, { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import SectionTitle from '../../shared/SectionTitle';
import * as Yup from 'yup';


const AddProjects = () => {

    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });

    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue);
        setValue(newValue);
    }
    const validationSchema = Yup.object().shape({
        name: Yup.object().shape({
            details: Yup.string().required('প্রকল্পের পুরো নাম দিন'),
            short: Yup.string().required('প্রকল্পের সংক্ষেপ নাম দিন'),
        }),
        // projectDetails: Yup.object().shape({
        //     PD: Yup.string().required('প্রকল্প পরিচালকের নাম দিন'),
        //     monitoringOfficers: Yup.array().required('মনিটরিং অফিসারগণের তালিকা দিন'),
        // }),
        time: Yup.object().shape({
            start: Yup.date().required('প্রকল্পের শুরুর তারিখ দিন'),
            end: Yup.date().required('প্রকল্পের সম্ভাব্য তারিখ দিন'),
        }),
        // email: Yup.string().email('ইমেইল ঠিকঠাক নয়').required('প্রকল্পের ইমেইল দিন'),
    });

    const formik = useFormik({
        initialValues: {
            name: {
                details: '',
                short: '',
            },
            projectDetails: {
                PD: '',
                monitoringOfficers: [],
            },
            logo: '',
            email: '',
            time: {
                start: value.startDate,
                end: value.endDate
            },
        },
        validationSchema,
        onSubmit: (values) => {
            // Handle form submission logic here
            console.log('Form values:', values);
        },
    });





    return (
        <section className='container'>
            <SectionTitle title={'নতুন প্রকল্প যুক্ত করুন'} />
            <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div>
                        <label className='font-extrabold mb-1 block'>প্রকল্পের পুরো নাম</label>
                        <input
                            type="text"
                            className='input input-bordered w-full'
                            id="name.details"
                            name="name.details"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder='প্রকল্পের পুরো নাম'
                            value={formik.values.name ? formik.values.name.details : ''}
                        />
                        {formik.touched.name && formik.touched.name.details && formik.errors.name?.details ? (
                            <div className='text-red-600 font-bold'>{formik.errors.name.details}</div>
                        ) : null}
                    </div>
                    <div >
                        <label className='font-extrabold mb-1 block'>প্রকল্পের সংক্ষেপ নাম</label>
                        <input
                            type="text"
                            className='input input-bordered w-full'
                            id="name.short"
                            name="name.short"

                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder='প্রকল্পের সংক্ষেপ নাম'
                            value={formik.values.name ? formik.values.name.short : ''}
                        />
                        {formik.touched.name && formik.touched.name.short && formik.errors.name?.short ? (
                            <div className='text-red-600 font-bold'>{formik.errors.name.short}</div>
                        ) : null}
                    </div>
                    <div >
                        <label className='font-extrabold mb-1 block'>প্রকল্প পরিচালক</label>
                        <input
                            type="text"
                            className='input input-bordered w-full'
                            id="projectDetails.PD"
                            name="projectDetails.PD"

                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder='প্রকল্প পরিচালকের  নাম'
                            value={formik.values.projectDetails ? formik.values.projectDetails.PD : ''}
                        />

                    </div>
                    <div>
                        <label className='font-extrabold mb-1 block'>মনিটরিং অফিসারগণ</label>

                        <input
                            type="text"
                            name={`projectDetails.monitoringOfficers`}
                            id={`projectDetails.monitoringOfficers`}
                            value={formik.values.projectDetails ? formik.values.projectDetails.monitoringOfficers : ''}
                            placeholder='মনিটরিং অফিসার'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className='input input-bordered w-full'
                        />


                    </div>
                    <div>
                        <label className='font-extrabold mb-1 block'>প্রকল্পের ইমেইল</label>
                        <input placeholder='প্রকল্পের ইমেইল' type="email" className="file-input input input-bordered w-full" />

                    </div>
                    <div>
                        <label className='font-extrabold mb-1 block'>প্রকল্পের লোগো</label>
                        <input type="file" className="file-input input-bordered w-full" />

                    </div>

                </div>



                <div className='mt-3 input input-bordered w-full'>
                    <label className='font-extrabold mb-1 block'>প্রকল্পের শুরু ও শেষের তারিখ (সম্ভাব্য)</label>
                    <Datepicker
                   
                        id="time"
                        name="time"
                        value={value}
                        onChange={handleValueChange}
                        showShortcuts={true}
                    />

                </div>


                <button type='submit' className="btn mt-5 w-full font-extrabold text-white btn-success">প্রকল্প যুক্ত করুন</button>

            </form>
        </section >
    );
};

export default AddProjects;
