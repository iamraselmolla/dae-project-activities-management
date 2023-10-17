import React, { useState } from 'react';
import SectionTitle from '../../shared/SectionTitle';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Season from '../../shared/Season';
import FiscalYear from '../../shared/FiscalYear';

const AddDemo = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
        console.log(selectedOption)
    }
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
        numersInfo: {
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
                    <div className="grid grid-cols-1 lg:grid-cols-3">

                    </div>

                </form>
            </div>
        </section>
    );
};

export default AddDemo;