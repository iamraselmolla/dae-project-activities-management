import React, { useState } from 'react';
import SectionTitle from '../../shared/SectionTitle';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Season from '../../shared/Season';
import FiscalYear from '../../shared/FiscalYear';
import Datepicker from 'react-tailwindcss-datepicker';

const AddDemo = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [boponValue, setBoponValue] = useState({
        startDate: null,
        endDate: null
    });
    const handleValueChange = (e) => {
        
    }
    const [roponValue, retBoponValue] = useState({
        startDate: null,
        endDate: null
    });
    const [kortonValue, setKotonValue] = useState({
        startDate: null,
        endDate: null
    });

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
            presentCondition: [],
            farmersReview: '',
            overallComment: ''
        }


    }
    const validationSchema = Yup.object({
        projectInfo: Yup.object().shape({
            full: Yup.string().required('প্রকল্প সিলেক্ট করুন'),
        }),
    });

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
                            // value={selectedOption}
                            // onChange={handleSelectChange}
                            >
                                <Season />
                            </select>
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

                            {formik.touched.farmersInfo && formik.touched.farmersInfo.name && formik.errors.farmersInfo?.name ? (
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
                                value={formik.values.farmersInfo ? formik.values.farmersInfo?.fatherOrHusbandName : ''}
                            />
                        </div>
                        <div>
                            <label className='font-extrabold mb-1 block'>ব্লকের নাম</label>
                            <select
                                className='input input-bordered w-full'
                                id="address.block"
                                name="address.block"
                                value={selectedOption}
                                onChange={handleSelectChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="" label="ব্লক সিলেক্ট করুন" />
                                <option value="option1" label="Option 1" />
                                <option value="option2" label="Option 2" />
                                <option value="option3" label="Option 3" />
                            </select>
                            {formik.touched.address && formik.touched.address.block && formik.errors.address?.block ? (
                                <div className='text-red-600 font-bold'>{formik.errors.address.block}</div>
                            ) : null}
                        </div>
                        <div>
                            <label className='font-extrabold mb-1 block'>ইউনিয়নের নাম</label>
                            <select
                                className='input input-bordered w-full'
                                id="address.union"
                                name="address.union"
                                value={selectedOption}
                                onChange={handleSelectChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="" label="ইউনিয়ন সিলেক্ট করুন" />
                                <option value="option1" label="Option 1" />
                                <option value="option2" label="Option 2" />
                                <option value="option3" label="Option 3" />
                            </select>
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
                            <label className='font-extrabold mb-1 block'>ভোটার আইডি কার্ড নং</label>
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
                                    id="date"
                                    onChange={handleValueChange}
                                    name="date"
                                    value={boponValue}
                                    showShortcuts={true}
                                />
                            </div>

                        </div>
                        <div>
                            <label className='font-extrabold mb-1 block'>রোপণ তারিখ</label>
                            <div className="input input-bordered w-full">

                                <Datepicker
                                    asSingle={true}
                                    id="date"
                                    onChange={handleValueChange}
                                    name="date"
                                    value={roponValue}
                                    showShortcuts={true}
                                />
                            </div>
                        </div>
                        <div>
                            <label className='font-extrabold mb-1 block'>কর্তন তারিখ</label>
                            <div className="input input-bordered w-full">

                                <Datepicker
                                    asSingle={true}
                                    id="date"
                                    onChange={handleValueChange}
                                    name="date"
                                    value={kortonValue}
                                    showShortcuts={true}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <label className='font-extrabold mb-1 block'>বর্তমান প্রদর্শনীর অবস্থা</label>
                        <textarea
                            className='input h-20 input-bordered w-full'
                            rows={10}></textarea>
                    </div>
                    <div className='mt-5'>
                        <label className='font-extrabold mb-1 block'>কৃষকের মন্তব্য</label>
                        <textarea
                            className='input h-20 input-bordered w-full'
                            rows={10}></textarea>
                    </div>
                    <div className='mt-5'>
                        <label className='font-extrabold mb-1 block'> মন্তব্য</label>
                        <textarea
                            className='input h-20 input-bordered w-full'
                            rows={10}></textarea>
                    </div>

                </form>
            </div>
        </section>
    );
};

export default AddDemo;