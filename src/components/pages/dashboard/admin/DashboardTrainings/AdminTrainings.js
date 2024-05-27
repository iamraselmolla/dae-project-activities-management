import React, { useEffect, useState } from 'react';
import SingleTrainingRow from './SingleTrainingRow';
import TableHead from '../../../../shared/TableHead';
import SectionTitle from '../../../../shared/SectionTitle';
import NoContentFound from '../../../../shared/NoContentFound';
import { useSelector } from 'react-redux';
import AddModuleButton from '../../../../shared/AddModuleButton';
import Season from '../../../../shared/Season';
import FiscalYear from '../../../../shared/FiscalYear';
import { toBengaliNumber } from 'bengali-number';

const AdminTrainings = () => {
    const { trainings: allTrainings, projects: allProjects } = useSelector(state => state.dae)
    const [selectedProject, setSelectedProject] = useState("");
    const [fiscalYear, setFiscalYear] = useState("");
    const [season, setSeason] = useState("");
    const [search, setSearch] = useState("");
    const [filterAllTrainings, setFilterAllTrainings] = useState([]);
    const filterTours = () => {
        let filtered = allTrainings;

        if (selectedProject !== "") {
            filtered = filtered.filter((project) =>
                project.projectInfo.details.includes(selectedProject)
            );
        }

        if (fiscalYear !== "") {
            filtered = filtered.filter((project) =>
                project.fiscalYear.includes(fiscalYear)
            );
        }

        if (season !== "") {
            filtered = filtered.filter((project) => project.season.includes(season));
        }

        return filtered;
    };
    ;

    useEffect(() => {
        const filtered = filterTours();
        setFilterAllTrainings(filtered);
    }, [selectedProject, fiscalYear, season]);
    const handleSelectChange = (e) => {
        setSelectedProject(e.target.value);
    };

    return (
        <div className="flex flex-col">
            <div className="mt-10 overflow-x-auto">
                <SectionTitle title={`সকল প্রশিক্ষণ (${toBengaliNumber(allTrainings?.length)})`} />
                <div className="flex flex-wrap justify-between items-center gap-3">
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
                            {allProjects?.map((project) => (
                                <option
                                    key={project?.name?.details}
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
                            <option value={""}>সিলেক্ট করুন</option>
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
                <div className="mt-6 mb-10">
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="খুজুন (প্রশিক্ষণের বিষয়, প্রকল্পের নাম, অর্থ বছর, মৌসুম, উপস্থিত কর্মকর্তার নাম)"
                    />
                </div>
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
                                filterAllTrainings?.length > 0 &&
                                filterAllTrainings?.map((training, index) => (
                                    <SingleTrainingRow
                                        index={index}
                                        key={training?._id}
                                        data={training}
                                    />
                                ))}



                        </table>
                        {filterAllTrainings?.length < 1 && (
                            <NoContentFound text={'কোনো কৃষক প্রশিক্ষণের তথ্য পাওয়া যায়নি।'} />
                        )}

                    </div>
                </div>
            </div>
            <AddModuleButton btnText={'addTraining'} />
        </div>
    );
};

export default AdminTrainings;