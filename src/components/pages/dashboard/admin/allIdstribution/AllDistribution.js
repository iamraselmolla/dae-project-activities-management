import React from 'react';
import { useSelector } from 'react-redux';
import DistributionTableRow from './DistributionTableRow';
import TableHead from '../../../../shared/TableHead';
import SectionTitle from '../../../../shared/SectionTitle';
import AddModuleButton from '../../../../shared/AddModuleButton';

const AllDistribution = () => {
    const { distributions } = useSelector(state => state.dae)
    return (
        <div className="p-1.5 min-w-full inline-block align-middle">
            <AddModuleButton link={'addDistribution'} btnText={'নতুন উপকরণ বিতরণ তথ্য যুক্ত করুন'} />
            <SectionTitle title={'সকল উপকরণ বিতরণ তথ্য'} />
            <div className="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900">
                <table className="min-w-full bg-white divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                        <tr className='divide-x font-extrabold divide-gray-200 dark:divide-gray-700'>
                            <TableHead text={'ক্রঃ নং'} />
                            <TableHead text={'প্রকল্প'} />
                            <TableHead text={'অর্থবছর ও মৌসুম'} />
                            <TableHead text={'তারিখ'} />
                            <TableHead text={'উপকরণ বিবরণ'} />
                            <TableHead text={'উপস্থিত কর্মকর্তা/গণ্যমান্য ব্যক্তিবর্গ'} />
                            <TableHead text={'মন্তব্য'} />
                            <TableHead text={'ছবিসমূহ'} />
                            <TableHead text={'একশন'} />
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {distributions?.length > 0 && distributions?.map((distribution, index) => (

                            <DistributionTableRow index={index} distribution={distribution} key={distribution?._id} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllDistribution;