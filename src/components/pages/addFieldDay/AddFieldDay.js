import React from 'react';
import SectionTitle from '../../shared/SectionTitle';
import { Field, useFormik } from 'formik';

const AddFieldDay = () => {
    const initialValues = {
        project: '',
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
        project: Yup.string().required('প্রকল্প সিলেক্ট করুন'),
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
        validate,
        onSubmit: (values) => {

            // Handle form submission logic here
            console.log('Form values:', values);
        },
    });

    return (
        <section className='container'>
            <SectionTitle title={'নতুন মাঠ দিবসের তথ্য যুক্ত করুন'} />
            <div className="mt-3">
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
                        <div>
                            <select
                                id="selectedOption"
                                name="selectedOption"
                            // value={selectedOption}
                            // onChange={handleSelectChange}
                            >
                                <option value="" label="Select an option" />
                                <option value="option1" label="Option 1" />
                                <option value="option2" label="Option 2" />
                                <option value="option3" label="Option 3" />
                            </select>
                        </div>

                    </div>






                    <button type='submit' className="btn mt-5 w-full font-extrabold text-white btn-success">প্রকল্প যুক্ত করুন</button>

                </form>
            </div>
        </section>
    );
};

export default AddFieldDay;