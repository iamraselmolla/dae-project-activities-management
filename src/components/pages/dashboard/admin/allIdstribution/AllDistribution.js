import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DistributionCard from './DistributionCard';
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

        return filtered;
    };

    useEffect(() => {
        const filtered = filterDistribution();
        setFilteredDistributions(filtered);
    }, [selectedProject, fiscalYear, season]);

    useEffect(() => {
        const filtered = allDistributions.filter((item) => {
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
        setFilteredDistributions(filtered);
    }, [search]);

    return (
        <div className="p-4">
            <AddModuleButton link={'addDistribution'} btnText={'নতুন উপকরণ বিতরণ তথ্য যুক্ত করুন'} />
            <SectionTitle title={'সকল উপকরণ বিতরণ তথ্য'} />
            <div className="mb-6">
                <div className="flex flex-wrap gap-4">
                    <div className="w-full sm:w-1/3">
                        <label className="font-bold mb-1 block">প্রকল্পের পুরো নাম</label>
                        <select
                            className="input input-bordered w-full"
                            value={selectedProject}
                            onChange={(e) => setSelectedProject(e.target.value)}
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

                    <div className="w-full sm:w-1/3">
                        <label className="font-bold mb-1 block">অর্থবছর</label>
                        <select
                            className="input input-bordered w-full"
                            value={fiscalYear}
                            onChange={(e) => setFiscalYear(e.target.value)}
                        >
                            <FiscalYear />
                        </select>
                    </div>

                    <div className="w-full sm:w-1/3">
                        <label className="font-bold mb-1 block">মৌসুম</label>
                        <select
                            className="input input-bordered w-full"
                            value={season}
                            onChange={(e) => setSeason(e.target.value)}
                        >
                            <Season />
                        </select>
                    </div>
                </div>
                <div className="mt-4">
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="খুজুন (প্রকল্পের নাম, উপস্থিত কর্মকর্তার নাম, উপকরণের বিবরণ, অর্থবছর, মৌসুম)"
                    />
                </div>
            </div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredDistributions.length > 0 ? (
                    filteredDistributions.map((distribution, index) => (
                        <DistributionCard key={distribution._id} distribution={distribution} index={index} />
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500">
                        কোন উপকরণ বিতরণ তথ্য পাওয়া যায়নি।
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllDistribution;
