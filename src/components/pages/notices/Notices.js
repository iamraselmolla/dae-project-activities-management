import React from 'react';
import SectionTitle from '../../shared/SectionTitle';
import AddModuleButton from '../../shared/AddModuleButton';

const Notices = () => {
    return (
        <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="text-right font-extrabold col-span-1">
                <SectionTitle
                    title={`সকল নোটিশ`}
                />
            </div>

            <AddModuleButton link={"add-notice"} btnText={"নোটিশ যুক্ত করুন"} />
        </section>
    );
};

export default Notices;