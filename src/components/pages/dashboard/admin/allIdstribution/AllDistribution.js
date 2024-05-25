import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DistributionTableRow from './DistributionTableRow';
import TableHead from '../../../../shared/TableHead';
import SectionTitle from '../../../../shared/SectionTitle';
import AddModuleButton from '../../../../shared/AddModuleButton';
import Season from '../../../../shared/Season';
import FiscalYear from '../../../../shared/FiscalYear';

const AllDistribution = () => {
    const { distributions: allDistributions, projects: allProject } = useSelector(state => state.dae);
    const [selectedProject, setSelectedProject] = useState("");
    const [fiscalYear, setFiscalYear] = useState("");
    const [season, setSeason] = useState("");
    const [search, setSearch] = useState("");
    const [filteredDistributions, setFilteredDistributions] = useState([]);
    const filterDistribution = () => {
        let filtered = allDistributions;

        if (selectedProject !== "") {
            filtered = filtered.filter((project) =>
                project.projectInfo.details.includes(selectedProject)
            );
        }

        if (fiscalYear !== "") {
            filtered = filtered.filter((project) =>
                project.time.fiscalYear.includes(fiscalYear)
            );
        }

        if (season !== "") {
            filtered = filtered.filter((project) =>
                project.time.season.includes(season)
            );
        }

        return filtered; // Return the filtered projects
    };

    useEffect(() => {
        const filtered = filterDistribution();
        setFilteredDistributions(filtered);
    }, [selectedProject, fiscalYear, season]);

    const handleSelectChange = (e) => {
        setSelectedProject(e.target.value);
    };

    useEffect(() => {
        // Filter data whenever the search input changes
        const filtered = allDistributions.filter((item) => {
            // Check if any field matches the search input
            for (const key in item) {
                if (typeof item[key] === "string" && item[key].includes(search)) {
                    return true;
                }
                if (typeof item[key] === "object") {
                    for (const subKey in item[key]) {
                        if (
                            typeof item[key][subKey] === "string" &&
                            item[key][subKey].includes(search)
                        ) {
                            return true;
                        }
                    }
                }
            }
            return false;
        });
        setFilteredDistributions(filtered); // Update filtered data
    }, [search]);
    return (
        <div className="p-1.5 min-w-full inline-block align-middle">
            <AddModuleButton link={'addDistribution'} btnText={'নতুন উপকরণ বিতরণ তথ্য যুক্ত করুন'} />
            <SectionTitle title={'সকল উপকরণ বিতরণ তথ্য'} />
            <div className="mb-12">
                <div className="flex py-6 flex-wrap justify-between items-center gap-3">
                    <div>
                        <label className="font-extrabold mb-1 block">
                            প্রকল্পের পুরো নাম
                        </label>
                        <select
                            className="input input-bordered w-full"
                            value={selectedProject}
                            onChange={handleSelectChange}
                        >
                            <option value="" label="প্রকল্প সিলেক্ট করুন" />
                            {allProject?.map((project) => (
                                <option
                                    key={project._id}
                                    value={project?.name?.details}
                                    label={project?.name?.details}
                                />
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="font-extrabold mb-1 block">অর্থবছর</label>
                        <select
                            className="input input-bordered w-full"
                            type="text"
                            value={fiscalYear}
                            onChange={(e) => setFiscalYear(e.target.value)}
                            placeholder="অর্থবছর সিলেক্ট করুন"
                        >
                            <FiscalYear />
                        </select>
                    </div>
                    <div>
                        <label className="font-extrabold mb-1 block">মৌসুম</label>
                        <select
                            className="input input-bordered w-full"
                            id="season"
                            name="season"
                            value={season}
                            onChange={(e) => setSeason(e.target.value)}
                        >
                            <Season />
                        </select>
                    </div>
                </div>
                <div className="w-full mb-12">
                    <div>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="খুজুন (প্রকল্পের নাম, উপস্থিত কর্মকর্তার নাম, মালামালের বিবরণ, অর্থবছর, মৌসুম)"
                        />
                    </div>
                </div>
            </div>
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
                        {filteredDistributions?.length > 0 && filteredDistributions?.map((distribution, index) => (

                            <DistributionTableRow index={index} distribution={distribution} key={distribution?._id} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllDistribution;