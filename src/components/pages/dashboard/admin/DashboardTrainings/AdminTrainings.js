import React from 'react';
import SingleTrainingRow from './SingleTrainingRow';
import TableHead from './TableComponent/TableHead';
import SectionTitle from '../../../../shared/SectionTitle';
import NoContentFound from '../../../../shared/NoContentFound';
import { useSelector } from 'react-redux';

const AdminTrainings = () => {
    const { trainings: allTrainings } = useSelector(state => state.dae)

    return (
        <div className="flex flex-col">
            <div className="mt-10 overflow-x-auto">
                <SectionTitle title={'সকল প্রশিক্ষণসমূহ'} />
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900">
                        <table className="min-w-full bg-white divide-y divide-gray-200 dark:divide-gray-700">
                            <thead>
                                <tr className="divide-x font-extrabold divide-gray-200 dark:divide-gray-700">
                                    <TableHead text={'ক্রমিক নং'} />
                                    <TableHead text={'প্রকল্পের নাম'} />
                                    <TableHead text={'অর্থবছর ও মৌসুম'} />
                                    <TableHead text={'বিষয়'} />
                                    <TableHead text={'তারিখ ও বার'} />
                                    <TableHead text={'কৃষক/কৃষাণী'} />
                                    <TableHead text={'কর্মকর্তা ও গণ্যমান্য ব্যক্তিদের নাম'} />
                                    <TableHead text={' ছবিসমূহ'} />
                                    <TableHead text={' মন্তব্য'} />
                                    <TableHead text={'একশন'} />
                                </tr>
                            </thead>
                            {
                                allTrainings?.length > 0 &&
                                allTrainings?.map((training, index) => (
                                    <SingleTrainingRow
                                        index={index}
                                        key={training?._id}
                                        data={training}
                                    />
                                ))}



                        </table>
                        {allTrainings?.length < 1 && (
                            <NoContentFound text={'কোনো কৃষক প্রশিক্ষণের তথ্য পাওয়া যায়নি।'} />
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminTrainings;