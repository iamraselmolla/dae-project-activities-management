import React from "react";
import { FiFacebook } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import { TbWorldWww } from "react-icons/tb";

const SingleMember = ({ data }) => {
  return (
    <div className="shadow-2xl">
      <div className="team p-6 rounded-md shadow-md dark:shadow-gray-800 dark:border-gray-700 bg-white dark:bg-slate-900 relative">
        <div className="rounded-md -mt-[10px] -ms-[10px] w-[98%] h-[98%] -z-1"></div>
        <img
          src={data?.img}
          className="w-24 h-24 rounded-full shadow-md dark:shadow-gray-800"
          alt={data?.name}
        />
        <div className="content mt-4">
          <h2 className="text-xl font-extrabold">{data?.name}</h2>
          <span className="text-slate-400 block font-extrabold">
            {data?.title}
          </span>
          <span className="text-slate-400 block">Role: {data?.role}</span>
          <ul className="list-none mt-4 space-x-2 flex">
            {data?.socialLinks?.facebook && (
              <li>
                <a
                  className="w-8 h-8 inline-flex items-center justify-center transition duration-500 ease-in-out text-base text-center border border-gray-100 dark:border-gray-800 rounded-md hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 hover:text-white"
                  href={`https://www.facebook.com/${data?.socialLinks?.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiFacebook />
                </a>
              </li>
            )}
            {data?.socialLinks?.gmail && (
              <li>
                <a
                  className="w-8 h-8 inline-flex items-center justify-center transition duration-500 ease-in-out text-base text-center border border-gray-100 dark:border-gray-800 rounded-md hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 hover:text-white"
                  href={`mailto:${data?.socialLinks?.gmail}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CgMail />
                </a>
              </li>
            )}
            {data?.socialLinks?.github && (
              <li>
                <a
                  className="w-8 h-8 inline-flex items-center justify-center transition duration-500 ease-in-out text-base text-center border border-gray-100 dark:border-gray-800 rounded-md hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 hover:text-white"
                  href={`https://www.github.com/${data?.socialLinks?.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub />
                </a>
              </li>
            )}
            {data?.socialLinks?.linkedin && (
              <li>
                <a
                  className="w-8 h-8 inline-flex items-center justify-center transition duration-500 ease-in-out text-base text-center border border-gray-100 dark:border-gray-800 rounded-md hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 hover:text-white"
                  href={`https://www.linkedin.com/in/${data?.socialLinks?.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin />
                </a>
              </li>
            )}
            {data?.socialLinks?.whatsapp && (
              <li>
                <a
                  className="w-8 h-8 inline-flex items-center justify-center transition duration-500 ease-in-out text-base text-center border border-gray-100 dark:border-gray-800 rounded-md hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 hover:text-white"
                  href={`https://wa.me/${data?.socialLinks?.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp />
                </a>
              </li>
            )}
            {data?.socialLinks?.portfolio && (
              <li>
                <a
                  className="w-8 h-8 inline-flex items-center justify-center transition duration-500 ease-in-out text-base text-center border border-gray-100 dark:border-gray-800 rounded-md hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 hover:text-white"
                  href={`${data?.socialLinks?.portfolio}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TbWorldWww />
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SingleMember;
