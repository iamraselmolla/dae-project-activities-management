// import React, { useEffect, useState } from 'react';
// import { getAllProjects } from '../../../../services/userServices';
// import SectionTitle from '../../../shared/SectionTitle';
// import Loader from '../../../shared/Loader';
// import SingleProject from './SingleProject'
// import toast from 'react-hot-toast';

// const AllProjects = () => {
//     const [allProjects, setAllProjects] = useState([]);
//     const [loading, setLoading] = useState(false)

//     useEffect(() => {
//         const getAllProjectsInfo = async () => {
//             try {
//                 setLoading(true)
//                 const result = await getAllProjects();
//                 console.log(result, "check result")
//                 if (result?.status === 200) {
//                     setAllProjects(result?.data?.data)
//                     setLoading(false)
//                 }
//                 else {
//                     console.log("Enter the else")
//                     setAllProjects([])
//                     setLoading(false)
//                 }
//             }

//             catch (err) {
//                 console.log(err)
//                 setLoading(false)
//             }
//         }
//         if (navigator.onLine) {
//             getAllProjectsInfo();
//         } else {
//             toast.error("দয়া করে আপনার ওয়াই-ফাই বা ইন্তারনেট সংযোগ যুক্ত করুন");
//         }

//     }, [])
//     return (
//         <div className='py-5 px-4'>
//             {!loading && allProjects?.length > 0 && <>

//                 <SectionTitle title={"সকল প্রকল্পের তালিকা"} />
//                 {allProjects?.map((project, index) =>

//                     <SingleProject index={index} key={project?._id} data={project} />

//                 )}
//             </>}

//             {loading && <div className='flex justify-center items-center'>
//                 <Loader />

//             </div>}

//         </div>
//     );
// };

// export default AllProjects;

import React, { useEffect, useState } from "react";
import { getAllProjects } from "../../../../services/userServices";
import SectionTitle from "../../../shared/SectionTitle";
import Loader from "../../../shared/Loader";
import SingleProject from "./SingleProject";
import toast from "react-hot-toast";
import { makeSureOnline } from "../../../shared/MessageConst";

const AllProjects = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const getAllProjectsInfo = async () => {
      try {
        setLoading(true);
        const result = await getAllProjects();
        if (result?.status === 200) {
          setAllProjects(result?.data?.data);
        } else {
          setError("Failed to fetch projects");
        }
      } catch (err) {
        setError("An error occurred while fetching projects");
      } finally {
        setLoading(false);
      }
    };

    if (navigator.onLine) {
      getAllProjectsInfo();
    } else {
      makeSureOnline();
    }
  }, [refetch]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="py-5 px-4">
      {loading && (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      )}
      {!loading && allProjects?.length > 0 && (
        <>
          <SectionTitle title="সকল প্রকল্পের তালিকা" />
          {allProjects?.map((project, index) => (
            <SingleProject
              setRefetch={setRefetch}
              refetch={refetch}
              index={index}
              key={project?._id}
              data={project}
            />
          ))}
        </>
      )}
      {!loading && allProjects?.length === 0 && (
        <div>No projects available</div>
      )}
    </div>
  );
};

export default AllProjects;
