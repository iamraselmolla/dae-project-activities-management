import React from 'react';
import SectionTitle from '../../shared/SectionTitle';

const AddDemo = () => {
    const initialValues = {
        farmersInfo: {
            name: '',
            fathersName: '',
            mothersName: ''
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

    }
    return (
        <section className='container'>
            <SectionTitle title={'প্রকল্পের প্রদর্শনীর তথ্য যুক্ত করুন'} />
            <div className="mt-2">

            </div>
        </section>
    );
};

export default AddDemo;