import React, { useState } from 'react';
import SectionTitle from '../../shared/SectionTitle';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Datepicker from 'react-tailwindcss-datepicker';
import FiscalYear from '../../shared/FiscalYear';
import Season from '../../shared/Season';
import allBlockAndUnion from '../../consts/blockAndUnion';



const AddFieldDay = () => {
    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [findBlock, setFindBlock] = useState(null)
    const [findUnion, setFindUnion] = useState(null)

    const handleValueChange = (e) => {
        const block = e.target.value;
        const blockExists = allBlockAndUnion.find(item => item.blocks.includes(block));
        setFindBlock(prevBlock => block);
        const unionForBlock = blockExists ? blockExists.union : null;
        setFindUnion(prevUnion => unionForBlock);
    }
    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
        
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

    const handleValueChangeofDate = (newValue) => {
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
        address: {
            village: '',
            block: '',
            union: ''
        },
        comment: '',


    };
    const validationSchema = Yup.object().shape({
        // project: Yup.object().shape({
        //     full: Yup.string().required('প্রকল্প সিলেক্ট করুন'),
        // }),
        // season: Yup.string().required('মৌসুম সিলেক্ট করুন'),
        // subject: Yup.string().required('মাঠদিবসের বিষয় সিলেক্ট করুন'),
        // guests: Yup.string().required('উপস্থিত কর্মকর্তা ও অতিথিদের তালিকা দিন'),
        // farmers: Yup.object().shape({
        //     male: Yup.number().min(0, 'Male farmers should be 0 or more').required('উপস্থিত পুরুষ কৃষক সংখ্যা'),
        //     female: Yup.number().min(0, 'Female farmers should be 0 or more').required('উপস্থিত নারী কৃষক সংখ্যা'),
        // }),
        // date: Yup.string().required('মাঠ দিবসের তারিখ'),
        // images: Yup.array().min(1, 'মাঠ দিবসের ছবি দিন'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            values.date = value.startDate;
        values.address.block = findBlock;
        values.address.union = findUnion;
        values.season =selectedOption; // Access the season field value correctly
        values.project.full = formik.values.project.full;
            // Handle form submission logic here
            console.log('Form values:', values);
            console.log('Form values:', selectedOption);
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
                            <select
                                className='input input-bordered w-full'
                                id="project.full"
                                name="project.full"
                                value={formik.values.project.full}
                                onChange={formik.handleChange}
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
                        <div>
                            <label className='font-extrabold mb-1 block'>প্রকল্পের সংক্ষেপ নাম</label>
                            <input
                                type="text"
                                className='input input-bordered w-full'
                                id="project.short"
                                name="project.short"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder='প্রকল্পের সংক্ষেপ নাম'
                                value={formik.values.project ? formik.values.project?.short : ''}
                            />

                            {formik.touched.project && formik.touched.project.short && formik.errors.project?.short ? (
                                <div className='text-red-600 font-bold'>{formik.errors.project.short}</div>
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
                                value={selectedOption}
                                onChange={handleSelectChange}
                                onBlur={formik.handleBlur}
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
                                onChange={formik.handleChange}
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
                                onChange={formik.handleChange}
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
                                onChange={formik.handleChange}
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
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder='কৃষক (নারী)'
                            // value={formik.values.farmers.female ? formik.values.farmers.female : ''}
                            />
                            {/* {formik.touched.name && formik.touched.name.details && formik.errors.name?.details ? (
                                <div className='text-red-600 font-bold'>{formik.errors.name.details}</div>
                            ) : null} */}
                        </div>
                        <div>
                            <label className='font-extrabold mb-1 block'>মাঠদিবসের তারিখ</label>
                            <Datepicker
                                asSingle={true}
                                id="date"
                                onChange={handleValueChangeofDate}
                                name="date"
                                value={value}
                                showShortcuts={true}
                            />

                        </div>

                        <div>
                            <label className='font-extrabold mb-1 block'>মাঠ দিবসের ছবিসমূহ</label>
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

                    <div className="grid mt-3 gap-4 mb-3 grid-cols-1 lg:grid-cols-3">
                        <div>
                            <label className='font-extrabold mb-1 block'>গ্রামের নাম</label>
                            <input
                                type="text"
                                className='input input-bordered w-full'
                                id="address.village"
                                name="address.village"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder='গ্রাম'
                                value={formik.values.address ? formik.values.address?.village : ''}
                            />
                        </div>
                        <div>
                            <label className='font-extrabold mb-1 block'>ব্লকের নাম</label>
                            <select
                                className='input input-bordered w-full'
                                id="address.block"
                                name="address.block"
                                // value={formik.values.address ? formik.values.address.block : ''}
                                onChange={handleValueChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="" label="ব্লক সিলেক্ট করুন" />
                                {allBlockAndUnion.map(singleUnion => singleUnion.blocks.map((block) => (
                                    <option key={block} value={block} label={block} />
                                )))}
                            </select>
                            {formik.touched.address && formik.touched.address.block && formik.errors.address?.block ? (
                                <div className='text-red-600 font-bold'>{formik.errors.address.block}</div>
                            ) : null}
                        </div>

                        <div>
                            <label className='font-extrabold mb-1 block'>ইউনিয়নের নাম</label>
                            <input
                                className='input input-bordered w-full'

                                value={findUnion} disabled />
                            {formik.touched.address && formik.touched.address.union && formik.errors.address?.union ? (
                                <div className='text-red-600 font-bold'>{formik.errors.address.union}</div>
                            ) : null}
                        </div>
                    </div>

                    <div className='mt-5'>
                        <label className='font-extrabold mb-1 block'>মন্তব্য যুক্ত করুন</label>
                        <textarea
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.comment}
                            id='comment'
                            name='comment'
                            className='input h-20 input-bordered w-full'
                            rows={10}></textarea>
                    </div>


                    <button type='submit' className="btn mt-5 w-full font-extrabold text-white btn-success">প্রকল্প যুক্ত করুন</button>

                </form>
            </div>
        </section>
    );
};

export default AddFieldDay;