import React from "react";
import { FiFacebook } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import { TbWorldWww } from "react-icons/tb";

const SingleMember = ({ data }) => {
  return (
    <div className="shadow-2xl">
      <div class="team p-6 rounded-md shadow-md dark:shadow-gray-800 dark:border-gray-700 bg-white dark:bg-slate-900 relative">
        <div class=" rounded-md -mt-[10px] -ms-[10px] w-[98%] h-[98%] -z-1"></div>
        <img
          src={data?.img}
          class="w-24 h-24 rounded-full shadow-md dark:shadow-gray-800"
          alt="Ronny Jofra"
        />
        <div class="content mt-4">
          <h2 className=" text-xl font-extrabold">{data?.name}</h2>
          <span class="text-slate-400 block font-extrabold">{data?.title}</span>
          <span class="text-slate-400 block">Role: {data?.role}</span>
          <ul class="list-none mt-4 space-x-2 flex">
            <li>
              <a
                class="w-8 h-8 inline-flex items-center justify-center transition duration-500 ease-in-out text-base text-center border border-gray-100 dark:border-gray-800 rounded-md hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 hover:text-white"
                href="/page-team"
              >
                <FiFacebook />
              </a>
            </li>
            <li>
              <a
                class="w-8 h-8 inline-flex items-center justify-center transition duration-500 ease-in-out text-base text-center border border-gray-100 dark:border-gray-800 rounded-md hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 hover:text-white"
                href="/page-team"
              >
                <CgMail />
              </a>
            </li>
            <li>
              <a
                class="w-8 h-8 inline-flex items-center justify-center transition duration-500 ease-in-out text-base text-center border border-gray-100 dark:border-gray-800 rounded-md hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 hover:text-white"
                href="/page-team"
              >
                <FaGithub />
              </a>
            </li>
            <li>
              <a
                class="w-8 h-8 inline-flex items-center justify-center transition duration-500 ease-in-out text-base text-center border border-gray-100 dark:border-gray-800 rounded-md hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 hover:text-white"
                href="/page-team"
              >
                <FaLinkedin />
              </a>
            </li>
            <li>
              <a
                class="w-8 h-8 inline-flex items-center justify-center transition duration-500 ease-in-out text-base text-center border border-gray-100 dark:border-gray-800 rounded-md hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 hover:text-white"
                href="/page-team"
              >
                <FaWhatsapp />
              </a>
            </li>
            <li>
              <a
                class="w-8 h-8 inline-flex items-center justify-center transition duration-500 ease-in-out text-base text-center border border-gray-100 dark:border-gray-800 rounded-md hover:border-indigo-600 dark:hover:border-indigo-600 hover:bg-indigo-600 hover:text-white"
                href="/page-team"
              >
                <TbWorldWww />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SingleMember;
