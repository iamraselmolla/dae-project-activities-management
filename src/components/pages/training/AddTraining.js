import { Field, useFormik } from 'formik';
import React, { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import SectionTitle from '../../shared/SectionTitle';
import * as Yup from 'yup';
import FiscalYear from '../../shared/FiscalYear';
import Season from '../../shared/Season';


const AddTraining = () => {

    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
        console.log(selectedOption)
    }

    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue);
        setValue(newValue);
    }
    const handleImageChange = (e) => {
        const files = e.target.files;
        const imageFiles = [];

        for (let i = 0; i < files.length; i++) {
            // Check if the selected file is an image
            if (files[i].type.startsWith('image/')) {
                imageFiles.push(URL.createObjectURL(files[i]));
            }
        }

        // Update the selected images
        setSelectedImages(imageFiles);
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
        comment: ''

    };
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            // Handle form submission logic here
            console.log('Form values:', values);
        },
    });

    return (
        <section className='container'>
            <SectionTitle title={'নতুন প্রশিক্ষণ তথ্য যুক্ত করুন'} />
            <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div>
                        <label className='font-extrabold mb-1 block'>প্রকল্পের পুরো নাম</label>
                        <select
                            className='input input-bordered w-full'
                            id="project.full"
                            name="project.full"
                            value={selectedOption}
                            onChange={handleSelectChange}
                            onBlur={formik.handleBlur}
                        >
                            <option value="" label="প্রকল্প সিলেক্ট করুন" />
                            <option value="option1" label="Option 1" />
                            <option value="option2" label="Option 2" />
                            <option value="option3" label="Option 3" />
                        </select>
                        {formik.touched.project && formik.touched.project.full && formik.errors.project?.full ? (
                            <div className='text-red-600 font-bold'>{formik.errors.project.full}</div>
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
                    <div>
                        <label className='font-extrabold mb-1 block'>অর্থবছর</label>
                        <select
                            className='input input-bordered w-full'
                            id="fiscalYear"
                            name="fiscalYear"
                            value={formik.values.fiscalYear}
                            onChange={formik.handleChange}
                        >
                            <FiscalYear />

                        </select>

                    </div>
                    <div>
                        <label className='font-extrabold mb-1 block'>মৌসুম</label>
                        <select
                            className='input input-bordered w-full'
                            id="season"
                            name="season"
                        // value={selectedOption}
                        // onChange={handleSelectChange}
                        >
                            <Season />
                        </select>
                    </div>
                    <div>
                        <label className='font-extrabold mb-1 block'>বিষয়</label>
                        <input
                            type="text"
                            className='input input-bordered w-full'
                            id="subject"
                            name="subject"
                            onBlur={formik.handleBlur}
                            placeholder='মাঠদিবসের বিষয় বা ফসল'
                        // value={formik.values.subject ? formik.values.subject : ''}
                        />

                    </div>
                    <div>
                        <label className='font-extrabold mb-1 block'>উপস্থিত কর্মকর্তা ও গন্যমান্য অতিথি</label>
                        <input
                            type="text"
                            className='input input-bordered w-full'
                            id="guests"
                            name="guests"
                            onBlur={formik.handleBlur}
                            placeholder='কর্মকর্তা ও গন্যমান্য অতিথি'
                        // value={formik.values.guests ? formik.values.guests : ''}
                        />

                    </div>
                    <div>
                        <label className='font-extrabold mb-1 block'>উপস্থিত কৃষক (পুরুষ)</label>
                        <input
                            type="number"
                            className='input input-bordered w-full'
                            id="farmers.male"
                            name="farmers.male"
                            onBlur={formik.handleBlur}
                            placeholder='কৃষক (পুরুষ)'
                        // value={formik.values.farmers.male ? formik.values.farmers.male : ''}
                        />

                    </div>
                    <div>
                        <label className='font-extrabold mb-1 block'>উপস্থিত কৃষক (নারী)</label>
                        <input
                            type="number"
                            className='input input-bordered w-full'
                            id="farmers.female"
                            name="farmers.female"
                            onBlur={formik.handleBlur}
                            placeholder='কৃষক (নারী)'
                        // value={formik.values.farmers.female ? formik.values.farmers.female : ''}
                        />
                        {/* {formik.touched.name && formik.touched.name.details && formik.errors.name?.details ? (
                                <div className='text-red-600 font-bold'>{formik.errors.name.details}</div>
                            ) : null} */}
                    </div>
                    <div className='mt-3 input input-bordered w-full'>
                        <label className='font-extrabold mb-1 block'>প্রশিক্ষণ শুরু ও শেষের তারিখ</label>
                        <Datepicker

                            id="time"
                            name="time"
                            value={value}
                            onChange={handleValueChange}
                            showShortcuts={true}
                        />

                    </div>

                    <div>
                        <label className='font-extrabold mb-1 block'>প্রশিক্ষণের ছবিসমূহ</label>
                        <input
                            multiple
                            name="images"
                            type="file"
                            className="file-input input-bordered w-full"
                            onChange={handleImageChange} // Add the onChange event

                        />
                        {/* Display the selected images */}
                        {selectedImages.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-3 justify-center">
                                {selectedImages.map((image, index) => (


                                    <img width={100}
                                        key={index}
                                        src={image}
                                        alt={`Selected Image ${index + 1}`}
                                        className="mt-2 max-w-64 h-auto"
                                    />

                                ))}
                            </div>
                        )}
                    </div>


                </div>

                <div className='mt-5'>
                    <label className='font-extrabold mb-1 block'>মন্তব্য যুক্ত করুন</label>
                    <textarea
                        className='input h-20 input-bordered w-full'
                        rows={10}></textarea>
                </div>


                <button type='submit' className="btn mt-5 w-full font-extrabold text-white btn-success">প্রশিক্ষণ যুক্ত করুন</button>

            </form>
        </section >
    );
};

export default AddTraining;
