import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaSearch, FaPlus } from 'react-icons/fa';
import { toBengaliNumber } from 'bengali-number';
import SingleTrainingCard from './SingleTrainingCard';
import FiscalYear from '../../../../shared/FiscalYear';
import SectionTitle from '../../../../shared/SectionTitle';
import Season from '../../../../shared/Season';

const AdminTrainings = () => {
    const dispatch = useDispatch();
    const { trainings: allTrainings, projects: allProjects } = useSelector(state => state.dae);
    const [selectedProject, setSelectedProject] = useState("");
    const [fiscalYear, setFiscalYear] = useState("");
    const [season, setSeason] = useState("");
    const [search, setSearch] = useState("");
    const [filteredTrainings, setFilteredTrainings] = useState([]);

    useEffect(() => {
        const filtered = allTrainings.filter(training =>
            (selectedProject === "" || training.projectInfo.details.includes(selectedProject)) &&
            (fiscalYear === "" || training.fiscalYear.includes(fiscalYear)) &&
            (season === "" || training.season.includes(season)) &&
            (search === "" ||
                training.subject.toLowerCase().includes(search.toLowerCase()) ||
                training.projectInfo.details.toLowerCase().includes(search.toLowerCase()) ||
                training.fiscalYear.toLowerCase().includes(search.toLowerCase()) ||
                training.season.toLowerCase().includes(search.toLowerCase()) ||
                training.guests.toLowerCase().includes(search.toLowerCase())
            )
        );
        setFilteredTrainings(filtered);
    }, [selectedProject, fiscalYear, season, search, allTrainings]);

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-8">
            <SectionTitle
                title={`সকল প্রশিক্ষণ (${toBengaliNumber(allTrainings?.length)})`}
            />
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <select
                        className="input input-bordered w-full"
                        value={selectedProject}
                        onChange={(e) => setSelectedProject(e.target.value)}
                    >
                        <option value="">প্রকল্প সিলেক্ট করুন</option>
                        {allProjects?.map((project) => (
                            <option key={project?.name?.details} value={project?.name?.details}>
                                {project?.name?.details}
                            </option>
                        ))}
                    </select>
                    <select
                        className="input input-bordered w-full"
                        value={fiscalYear}
                        onChange={(e) => setFiscalYear(e.target.value)}
                    >
                        <option value="">অর্থবছর সিলেক্ট করুন</option>
                        <FiscalYear />

                    </select>
                    <select
                        className="input input-bordered w-full"
                        value={season}
                        onChange={(e) => setSeason(e.target.value)}
                    >
                        <Season />
                    </select>
                    <div className="relative">
                        <input
                            type="text"
                            className="input input-bordered w-full pl-10"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="খুজুন..."
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTrainings.map((training, index) => (
                    <SingleTrainingCard key={training._id} training={training} index={index} />
                ))}
            </div>

        </div>
    );
};

export default AdminTrainings;