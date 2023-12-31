import React, { useState } from 'react';
import SectionTitle from '../../shared/SectionTitle';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Season from '../../shared/Season';
import FiscalYear from '../../shared/FiscalYear';
import Datepicker from 'react-tailwindcss-datepicker';
import allBlockAndUnion from '../../consts/blockAndUnion';

const AddDemo = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);

    const [findBlock, setFindBlock] = useState(null)
    const [findUnion, setFindUnion] = useState(null)
    const [datePickers, setDatePickers] = useState({
        bopon: {
            startDate: null,
            endDate: null
        },
        ropon: {
            startDate: null,
            endDate: null
        },
        korton: {
            startDate: null,
            endDate: null
        }
    });
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
    const handleDatePickerValue = (picker, selectedDate) => {
        // Use a copy of the state to avoid modifying the state directly
        const updatedDatePickers = { ...datePickers };

        // Update the selected date picker with the new value
        updatedDatePickers[picker] = selectedDate;

        // Update the state with the new date pickers object
        setDatePickers(updatedDatePickers);
    };




    const handleValueChange = (e) => {
        const block = e.target.value;

        // Use the updated block directly in the find method
        const blockExists = allBlockAndUnion.find(item => item.blocks.includes(block));
        console.log(blockExists);

        // Use the functional form of setFindBlock
        setFindBlock(prevBlock => block);

        // Update setFindUnion based on the selected block
        const unionForBlock = blockExists ? blockExists.union : null;

        setFindUnion(prevUnion => unionForBlock);

    }

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
        console.log(selectedOption);
    };


    const initialValues = {
        projectInfo: {
            full: '',
            short: ''
        },
        demoTime: {
            fiscalYear: '',
            season: ''
        },

        farmersInfo: {
            name: '',
            fatherOrHusbandName: ''
        },
        address: {
            village: '',
            block: '',
            union: ''
        },
        numbersInfo: {
            NID: '',
            BID: '',
            mobile: '',
            agriCard: ''
        },
        demoInfo: {
            crop: '',
            variety: '',
            tech: '',
            area: '',
        },
        production: {
            productionPerHector: '',
            totalProduction: '',
            sidePlotProduction: '',
        },

        demoDate: {
            bopon: '',
            ropon: '',
            korton: '',
        },
        comment: {
            presentCondition: '',
            farmersReview: '',
            overallComment: ''
        },
        demoImages: []


    }
    const validationSchema = Yup.object({
        // projectInfo: Yup.object().shape({
        //     full: Yup.string().required('প্রকল্প সিলেক্ট করুন'),
        //     short: Yup.string().required('প্রকল্পের সংক্ষেপ নাম'),
        // }),
        // demoTime: Yup.object().shape({
        //     fiscalYear: Yup.string().required('অর্থবছর সিলেক্ট করুন'),
        //     season: Yup.string().required('মৌসুম সিলেক্ট করুন'),
        // }),
        // farmersInfo: Yup.object().shape({
        //     fiscalYear: Yup.string().required('কৃষকের নাম দিন')
        // }),
        // demoInfo: Yup.object().shape({
        //     crop: Yup.string().required('প্রদর্শনীর নাম / ফসলের নাম লিখুন')
        // }),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            values.demoDate = datePickers;
            values.address.block = findBlock
            values.address.union = findUnion
            values.demoTime.season = formik.values.demoTime.season;
            values.projectInfo.full = selectedOption


            // Handle form submission logic here
            console.log('Form values:', values);
            console.log('Form date:', datePickers);
        },
    });


    return (
        <section className='container'>
            <SectionTitle title={'প্রকল্পের প্রদর্শনীর তথ্য যুক্ত করুন'} />
            <div className="mt-2">
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div>
                            <label className='font-extrabold mb-1 block'>প্রকল্পের পুরো নাম</label>
                            <select
                                className='input input-bordered w-full'
                                id="projectInfo.full"
                                name="projectInfo.full"
                                value={selectedOption}
                                onChange={handleSelectChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="" label="প্রকল্প সিলেক্ট করুন" />
                                <option value="option1" label="Option 1" />
                                <option value="option2" label="Option 2" />
                                <option value="option3" label="Option 3" />
                            </select>
                            {formik.touched.projectInfo && formik.touched.projectInfo.full && formik.errors.projectInfo?.full ? (
                                <div className='text-red-600 font-bold'>{formik.errors.projectInfo.full}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className='font-extrabold mb-1 block'>প্রকল্পের সংক্ষেপ নাম</label>
                            <input
                                type="text"
                                className='input input-bordered w-full'
                                id="projectInfo.short"
                                name="projectInfo.short"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder='প্রকল্পের সংক্ষেপ নাম'
                                value={formik.values.projectInfo ? formik.values.projectInfo?.short : ''}
                            />

                            {formik.touched.projectInfo && formik.touched.projectInfo.short && formik.errors.projectInfo?.short ? (
                                <div className='text-red-600 font-bold'>{formik.errors.projectInfo.short}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className='font-extrabold mb-1 block'>অর্থবছর</label>
                            <select
                                className='input input-bordered w-full'
                                id="demoTime.fiscalYear"
                                name="demoTime.fiscalYear"
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
                                id="demoTime.season"
                                name="demoTime.season"
                                value={formik.values.demoTime.season} // Update value to use formik values
                                onChange={formik.handleChange} // Update the onChange handler
                                onBlur={formik.handleBlur}
                            >
                                <Season />
                            </select>
                            {formik.touched.demoTime && formik.touched.demoTime.season && formik.errors.demoTime?.season ? (
                                <div className='text-red-600 font-bold'>{formik.errors.demoTime.season}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className='font-extrabold mb-1 block'>কৃষকের নাম</label>
                            <input
                                type="text"
                                className='input input-bordered w-full'
                                id="farmersInfo.name"
                                name="farmersInfo.name"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder='প্রকল্পের সংক্ষেপ নাম'
                                value={formik.values.farmersInfo ? formik.values.farmersInfo?.name : ''}
                            />

                            {formik.errors.farmersInfo?.name ? (
                                <div className='text-red-600 font-bold'>{formik.errors.farmersInfo.name}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className='font-extrabold mb-1 block'>পিতা/স্বামীর নাম নাম</label>
                            <input
                                type="text"
                                className='input input-bordered w-full'
                                id="farmersInfo.fatherOrHusbandName"
                                name="farmersInfo.fatherOrHusbandName"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder='পিতা/স্বামীর নাম নাম'
                                value={formik.values.farmersInfo ? formik.values.farmersInfo?.fatherOrHusbandName : ''}
                            />

                            {formik.touched.farmersInfo && formik.touched.farmersInfo.fatherOrHusbandName && formik.errors.farmersInfo?.fatherOrHusbandName ? (
                                <div className='text-red-600 font-bold'>{formik.errors.farmersInfo.fatherOrHusbandName}</div>
                            ) : null}
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
                    <div className="grid lg:grid-cols-4 gap-4  grid-cols-1">
                        <div>
                            <label className='font-extrabold mb-1 block'>মোবাইল নং</label>
                            <input
                                type="text"
                                className='input input-bordered w-full'
                                id="numbersInfo.mobile"
                                name="numbersInfo.mobile"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder='মোবাইল'
                                value={formik.values.numbersInfo ? formik.values.numbersInfo?.mobile : ''}
                            />

                            {formik.touched.numbersInfo && formik.touched.numbersInfo.mobile && formik.errors.numbersInfo?.mobile ? (
                                <div className='text-red-600 font-bold'>{formik.errors.numbersInfo.mobile}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className='font-extrabold mb-1 block'>ভোটার আইডি (NID) কার্ড নং</label>
                            <input
                                type="text"
                                className='input input-bordered w-full'
                                id="numbersInfo.NID"
                                name="numbersInfo.NID"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder='এন আই ডি'
                                value={formik.values.numbersInfo ? formik.values.numbersInfo?.NID : ''}
                            />

                            {formik.touched.numbersInfo && formik.touched.numbersInfo.NID && formik.errors.numbersInfo?.NID ? (
                                <div className='text-red-600 font-bold'>{formik.errors.numbersInfo.NID}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className='font-extrabold mb-1 block'>BID নং</label>
                            <input
                                type="text"
                                className='input input-bordered w-full'
                                id="numbersInfo.BID"
                                name="numbersInfo.BID"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder='বি আই ডি'
                                value={formik.values.numbersInfo ? formik.values.numbersInfo?.BID : ''}
                            />

                            {formik.touched.numbersInfo && formik.touched.numbersInfo.BID && formik.errors.numbersInfo?.BID ? (
                                <div className='text-red-600 font-bold'>{formik.errors.numbersInfo.BID}</div>
                            ) : null}
                        </div>

                        <div>
                            <label className='font-extrabold mb-1 block'>কৃষি কার্ড নং</label>
                            <input
                                type="text"
                                className='input input-bordered w-full'
                                id="numbersInfo.agriCard"
                                name="numbersInfo.agriCard"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder='কৃষি কার্ড'
                                value={formik.values.numbersInfo ? formik.values.numbersInfo?.agriCard : ''}
                            />

                            {formik.touched.numbersInfo && formik.touched.numbersInfo.agriCard && formik.errors.numbersInfo?.agriCard ? (
                                <div className='text-red-600 font-bold'>{formik.errors.numbersInfo.agriCard}</div>
                            ) : null}
                        </div>
                    </div>
                    <div className="grid mt-3 lg:grid-cols-4 gap-4  grid-cols-1">
                        <div>
                            <label className='font-extrabold mb-1 block'>ফসল</label>
                            <input
                                type="text"
                                className='input input-bordered w-full'
                                id="demoInfo.crop"
                                name="demoInfo.crop"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder='ফসল'
                                value={formik.values.demoInfo ? formik.values.demoInfo?.crop : ''}
                            />

                            {formik.touched.demoInfo && formik.touched.demoInfo.crop && formik.errors.demoInfo?.crop ? (
                                <div className='text-red-600 font-bold'>{formik.errors.demoInfo.crop}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className='font-extrabold mb-1 block'>ফসলের জাত</label>
                            <input
                                type="text"
                                className='input input-bordered w-full'
                                id="demoInfo.variety"
                                name="demoInfo.variety"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder='ফসলের জাত'
                                value={formik.values.demoInfo ? formik.values.demoInfo?.variety : ''}
                            />

                            {formik.touched.demoInfo && formik.touched.demoInfo.variety && formik.errors.demoInfo?.variety ? (
                                <div className='text-red-600 font-bold'>{formik.errors.demoInfo.variety}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className='font-extrabold mb-1 block'>প্রযুক্তি</label>
                            <input
                                type="text"
                                className='input input-bordered w-full'
                                id="demoInfo.tech"
                                name="demoInfo.tech"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder='প্রযুক্তি'
                                value={formik.values.demoInfo ? formik.values.demoInfo?.tech : ''}
                            />

                            {formik.touched.demoInfo && formik.touched.demoInfo.tech && formik.errors.demoInfo?.tech ? (
                                <div className='text-red-600 font-bold'>{formik.errors.demoInfo.tech}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className='font-extrabold mb-1 block'>প্রদর্শনীর আয়তন</label>
                            <input
                                type="text"
                                className='input input-bordered w-full'
                                id="demoInfo.area"
                                name="demoInfo.area"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder='প্রদর্শনীর আয়তন'
                                value={formik.values.demoInfo ? formik.values.demoInfo?.area : ''}
                            />

                            {formik.touched.demoInfo && formik.touched.demoInfo.area && formik.errors.demoInfo?.area ? (
                                <div className='text-red-600 font-bold'>{formik.errors.demoInfo.area}</div>
                            ) : null}
                        </div>


                    </div>
                    <div className="grid mt-3 lg:grid-cols-3 gap-4  grid-cols-1">
                        <div>
                            <label className='font-extrabold mb-1 block'>বপণ তারিখ</label>
                            <div className="input input-bordered w-full">
                                <Datepicker
                                    asSingle={true}
                                    id="demoDate.bopon"
                                    onChange={(selectedDate) => handleDatePickerValue('bopon', selectedDate)}
                                    name="demoDate.bopon"
                                    value={datePickers?.bopon}
                                    showShortcuts={true}
                                />
                            </div>

                        </div>
                        <div>
                            <label className='font-extrabold mb-1 block'>রোপণ তারিখ</label>
                            <div className="input input-bordered w-full">

                                <Datepicker
                                    asSingle={true}
                                    id="demoDate.ropon"
                                    onChange={(selectedDate) => handleDatePickerValue('ropon', selectedDate)}
                                    name="demoDate.ropon"
                                    value={datePickers?.ropon}
                                    showShortcuts={true}
                                />
                            </div>
                        </div>
                        <div>
                            <label className='font-extrabold mb-1 block'>কর্তন তারিখ</label>
                            <div className="input input-bordered w-full">

                                <Datepicker
                                    asSingle={true}
                                    id="demoDate.korton"
                                    onChange={(selectedDate) => handleDatePickerValue('korton', selectedDate)}
                                    name="demoDate.korton"
                                    value={datePickers?.korton}
                                    showShortcuts={true}
                                />
                            </div>
                        </div>

                        <div>
                            <label className='font-extrabold mb-1 block'>ফলন (হেক্টর)</label>
                            <input
                                type="number"
                                className='input input-bordered w-full'
                                id="production.productionPerHector"
                                name="production.productionPerHector"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder='হেক্টর প্রতি ফলন'
                                value={formik.values.production ? formik.values.production?.productionPerHector : ''}
                            />

                            {formik.touched.production && formik.touched.production.productionPerHector && formik.errors.production?.productionPerHector ? (
                                <div className='text-red-600 font-bold'>{formik.errors.production.productionPerHector}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className='font-extrabold mb-1 block'>প্রদর্শনীতে উৎপাদন</label>
                            <input
                                type="number"
                                className='input input-bordered w-full'
                                id="production.totalProduction"
                                name="production.totalProduction"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder='প্রদর্শনীতে সর্বমোট উৎপাদন'
                                value={formik.values.production ? formik.values.production?.totalProduction : ''}
                            />

                            {formik.touched.production && formik.touched.production.totalProduction && formik.errors.production?.totalProduction ? (
                                <div className='text-red-600 font-bold'>{formik.errors.production.totalProduction}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className='font-extrabold mb-1 block'>কন্ট্রোল প্লটে উৎপাদন</label>
                            <input
                                type="number"
                                className='input input-bordered w-full'
                                id="production.sidePlotProduction"
                                name="production.sidePlotProduction"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder='সাইড প্লট / কন্ট্রোল প্লটে উৎপাদন'
                                value={formik.values.production ? formik.values.production?.sidePlotProduction : ''}
                            />

                            {formik.touched.production && formik.touched.production.sidePlotProduction && formik.errors.production?.sidePlotProduction ? (
                                <div className='text-red-600 font-bold'>{formik.errors.production.sidePlotProduction}</div>
                            ) : null}
                        </div>
                    </div>
                    <div className="mt-3">
                        <label className="font-extrabold mb-1 block">প্রদর্শনীর  ছবিসমূহ</label>
                        <input
                            multiple
                            name="images"
                            type="file"
                            className="file-input input-bordered w-full"
                            onChange={handleImageChange} // Add the onChange event
                        />
                    </div>

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



                    <div className='mt-5'>
                        <label className='font-extrabold mb-1 block'>বর্তমান প্রদর্শনীর অবস্থা</label>
                        <textarea
                            name='comment.presentCondition'
                            id='comment.presentCondition'
                            className='input h-20 input-bordered w-full'
                            rows={10}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.comment.presentCondition}
                        ></textarea>
                    </div>
                    <div className='mt-5'>
                        <label className='font-extrabold mb-1 block'>কৃষকের মন্তব্য</label>
                        <textarea
                            name='comment.farmersReview'
                            id='comment.farmersReview'
                            className='input h-20 input-bordered w-full'
                            rows={10}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.comment.farmersReview}
                        ></textarea>
                    </div>
                    <div className='mt-5'>
                        <label className='font-extrabold mb-1 block'> মন্তব্য</label>
                        <textarea
                            name='comment.overallComment'
                            id='comment.overallComment'
                            className='input h-20 input-bordered w-full'
                            rows={10}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.comment.overallComment}
                        ></textarea>
                    </div>


                    <button type='submit' className="btn mt-5 w-full font-extrabold text-white btn-success">প্রদর্শনী যুক্ত করুন</button>
                </form>
            </div>
        </section>
    );
};

export default AddDemo;