import React, { useContext, useEffect, useState } from 'react';
import AddModuleButton from '../../shared/AddModuleButton';
import { AuthContext } from '../../AuthContext/AuthProvider';
import SectionTitle from '../../shared/SectionTitle';
import toast from 'react-hot-toast';
import { getAllDistributions } from '../../../services/userServices';
import SingleDistribution from './SingleDIstribution';

const Distribution = () => {
    const { user } = useContext(AuthContext);
    const [allDistributions, setDistributions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllDistributions();
                if (result.status === 200) {
                    setDistributions(result?.data?.data);
                }
            } catch (err) {
                toast.error("সকল মালামাল বিতরণের তথ্য আনতে অসুবিধার সৃষ্টি হচ্ছে । ");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            {user && <div className="text-right font-extrabold">
                <AddModuleButton link={'addDistribution'} btnText={'মালামাল বিতরণের তথ্য যুক্ত করুন'} />
            </div>}
            <SectionTitle title={"সকল মালামাল বিতরণের তথ্য"} />

            {/* Display SingleDistribution components for each distribution */}
            {loading ? (
                <div>Loading...</div> // Show loader while data is being fetched
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6">
                    {allDistributions.map((distribution, index) => (
                        <SingleDistribution key={index} data={distribution} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default Distribution;
