import React, { useContext } from 'react';
import AddModuleButton from '../../shared/AddModuleButton';
import { AuthContext } from '../../AuthContext/AuthProvider';

const Distribution = () => {
    const { user } = useContext(AuthContext);

    return (
        <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            {user && <div className="text-right font-extrabold">
                <AddModuleButton link={'addDistribution'} btnText={'মালামাল বিতরণের তথ্য যুক্ত করুন'} />
            </div>}
        </section>
    );
};

export default Distribution;