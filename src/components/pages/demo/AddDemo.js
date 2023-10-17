import React, { useState } from 'react';
import SectionTitle from '../../shared/SectionTitle';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddDemo = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
        console.log(selectedOption)
    }
    const initialValues = {
        demoTime: {
            fiscalYear: '',
            season: ''
        },
        projectInfo: {
            full: '',
            short: ''
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
    const validationSchema = {
        projectInfo: Yup.object().shape({
            full: Yup.string().required('প্রকল্প সিলেক্ট করুন'),
        }),
    }
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
                    </div>

                </form>
            </div>
        </section>
    );
};

export default AddDemo;