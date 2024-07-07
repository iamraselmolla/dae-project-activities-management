import React, { useContext, useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import SectionTitle from "../../shared/SectionTitle";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import compressAndUploadImage from "../../utilis/compressImages";
import { uploadToCloudinary } from "../../utilis/uploadToCloudinary";
import Loader from "../../shared/Loader";
import { makeSureOnline } from "../../shared/MessageConst";
import { AuthContext } from "../../AuthContext/AuthProvider";
import FiscalYear from "../../shared/FiscalYear";
import getFiscalYear from "../../shared/commonDataStores";
import { toBengaliNumber } from "bengali-number";
import Season from "../../shared/Season";
import { useSelector } from "react-redux";
import { createDistribution } from "../../../services/userServices";

const AddDistribution = () => {
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState(null);
    const [images, setImages] = useState([]);
    const { user } = useContext(AuthContext);
    const [selectedProject, setSelectedProject] = useState({});
    const { projects: allProjects } = useSelector(state => state.dae);
    const [rawImages, setRawImages] = useState([])

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        const imagesArray = files.map((file) => URL.createObjectURL(file));
        setImages((prevImages) => prevImages.concat(imagesArray));
        setRawImages([...rawImages, ...files]);
    };

    const handleRemoveImage = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);

        setImages(updatedImages);
        formik.setFieldValue("images", updatedImages);
    };

    const validationSchema = Yup.object().shape({
        // projectInfo: Yup.object().shape({
        //     details: Yup.string().required("প্রকল্পের নাম প্রয়োজন"),
        //     short: Yup.string().required("প্রকল্পের সংক্ষেপ নাম প্রয়োজন"),
        // }),
        // time: Yup.object().shape({
        //     fiscalYear: Yup.string().required("অর্থবছর প্রয়োজন"),
        //     season: Yup.string().required("মৌসুম প্রয়োজন"),
        //     date: Yup.date().required("তারিখ প্রয়োজন"),
        // }),
        // materialName: Yup.string().required("বিতরণকৃত উপকরণের বিবরণ প্রয়োজন"),
        // images: Yup.array().required("ছবিসমূহ প্রয়োজন").min(1, "কমপক্ষে ১টি ছবি যুক্ত করুন"),
        // presentGuests: Yup.string().required("উপস্থিত অতিথিদের নাম প্রয়োজন"),
        // comment: Yup.string().required("মন্তব্য প্রয়োজন"),
    });


    const resetForm = () => {
        formik.resetForm();
        setImages([]);
    };

    const initialValues = {
        projectInfo: {
            details: "",
            short: ""
        },
        time: {
            fiscalYear: "",
            season: "",
            date: new Date(),
        },
        materialName: "",
        presentGuests: "",
        images: [],
        comment: "",
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            if (!user) {
                return toast.error(
                    "বিতরণের তথ্য যুক্ত করতে হলে আপনাকে অবশ্যই লগিন করতে হবে।"
                );
            }
            try {
                setLoading(true);
                setLoadingMessage("ছবি আপ্লোড হচ্ছে");

                const uploadedImageLinks = [];
                for (let i = 0; i < images?.length; i++) {
                    setLoadingMessage(
                        `${i + 1} নং ছবি কম্প্রেসড এবং আপ্লোড হচ্ছে`
                    );

                    const compressedImage = await compressAndUploadImage(rawImages[i]);
                    const result = await uploadToCloudinary(compressedImage, "distribution");
                    uploadedImageLinks.push(result);
                }
                setLoadingMessage("বিতরণের তথ্য আপ্লোড হচ্ছে");
                values.images = uploadedImageLinks;
                values.time.date = formik.values.time.date?.startDate

                const result = await createDistribution(values);
                if (result?.status === 200) {
                    toast.success("বিতরণের তথ্য যুক্ত করা হয়েছে।");
                    setLoading(false);
                    resetForm();
                }
            } catch (err) {
                console.error("Error:", err);
                setLoading(false);
            }
        },
    });

    const handleSelectChange = (e) => {
        const selectedProjectName = e.target.value;
        const findProject = allProjects.find(
            (project) => project.name?.details === selectedProjectName
        );
        setSelectedProject(findProject);
        formik.setFieldValue('projectInfo', findProject?.name)
    };

    return (
        <section className="mx-auto bg-white max-w-7xl px-2 sm:px-6 lg:px-8">
            <SectionTitle title={"নতুন বিতরণ তথ্য যুক্ত করুন"} />
            <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div>
                        <label className="font-extrabold mb-1 block">
                            প্রকল্পের পুরো নাম
                        </label>
                        <select
                            className="input input-bordered w-full"
                            id="projectInfo?.details"
                            name="projectInfo?.details"
                            value={selectedProject?.name?.details || formik.values.projectInfo?.details}
                            onChange={handleSelectChange}
                        >
                            <option value="" label="প্রকল্প সিলেক্ট করুন" />
                            {allProjects.map((project) => (
                                <option
                                    key={project?.name?.details}
                                    value={project?.name?.details}
                                    label={project?.name?.details}
                                />
                            ))}
                        </select>
                        {formik.touched.projectInfo?.details && formik.errors.projectInfo?.details && (
                            <div className="text-red-600 font-bold">
                                {formik.errors.projectInfo?.details}
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="font-extrabold mb-1 block">
                            প্রকল্পের সংক্ষেপ নাম
                        </label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            id="projectInfo?.short"
                            name="projectInfo?.short"
                            value={selectedProject?.name?.short || ""}
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="font-extrabold mb-1 block">অর্থবছর</label>
                        <select
                            className="input input-bordered w-full"
                            id="time.fiscalYear"
                            name="time.fiscalYear"
                            value={formik.values.time.fiscalYear}
                            onChange={formik.handleChange}
                            defaultValue={toBengaliNumber(getFiscalYear())}
                        >
                            <FiscalYear />
                        </select>
                    </div>
                    <div>
                        <label className="font-extrabold mb-1 block">মৌসুম</label>
                        <select
                            className="input input-bordered w-full"
                            id="time.season"
                            name="time.season"
                            value={formik.values.time?.season} // Update value to use formik values
                            onChange={formik.handleChange} // Update the onChange handler
                            onBlur={formik.handleBlur}
                        >
                            <Season />
                        </select>
                        {formik.touched.time?.season && formik.errors.time?.season && (
                            <div className="text-red-600 font-bold">
                                {formik.errors.time?.season}
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="font-extrabold mb-1 block">বিতরণকৃত উপকরণের বিবরণ</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            id="materialName"
                            name="materialName"
                            onBlur={formik.handleBlur}
                            placeholder="উপকরণের নাম"
                            onChange={formik.handleChange}
                            value={formik.values.materialName}
                        />
                        {formik.touched.materialName && formik.errors.materialName && (
                            <div className="text-red-600 font-bold">
                                {formik.errors.materialName}
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="font-extrabold mb-1 block">তারিখ</label>
                        <Datepicker
                            id="time.date"
                            name="time.date"
                            asSingle={true}
                            value={formik.values.time?.date}
                            onChange={(newValue) => formik.setFieldValue("time.date", newValue) && console.log(newValue)}
                            showShortcuts={true}
                        />
                        {formik.touched.time?.date && formik.errors?.time?.date && (
                            <div className="text-red-600 font-bold">{formik.errors?.time?.date}</div>
                        )}
                    </div>
                    <div>
                        <label className="font-extrabold mb-1 block">
                            উপস্থিত কর্মকর্তা/গণ্যমান্য ব্যক্তিবর্গের নাম (যদি থাকে)
                        </label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            id="presentGuests"
                            name="presentGuests"
                            onBlur={formik.handleBlur}
                            placeholder="উপস্থিত অতিথিদের নাম"
                            onChange={formik.handleChange}
                            value={formik.values.presentGuests}
                        />
                        {formik.touched.presentGuests && formik.errors.presentGuests && (
                            <div className="text-red-600 font-bold">
                                {formik.errors.presentGuests}
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="font-extrabold mb-1 block">ছবিসমূহ</label>
                        <input
                            multiple
                            name="images"
                            type="file"
                            className="file-input input-bordered w-full"
                            onChange={handleImageChange}
                        />
                        {images?.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-3 justify-center">
                                {images?.map((image, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            width={100}
                                            src={image}
                                            alt={`Selected Image ${index + 1}`}
                                            className="mt-2 max-w-64 h-auto"
                                        />
                                        <button
                                            type="button"
                                            className="absolute flex justify-center items-center w-6 h-6 rounded-full bg-red-700 top-0 right-0 text-white hover:text-green-300"
                                            onClick={() => handleRemoveImage(index)}
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-5">
                    <label className="font-extrabold mb-1 block">মন্তব্য</label>
                    <textarea
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="comment"
                        value={formik.values.comment}
                        className="input h-20 input-bordered w-full"
                        rows={10}
                    ></textarea>
                    {formik.touched.comment && formik.errors.comment && (
                        <div className="text-red-600 font-bold">{formik.errors.comment}</div>
                    )}
                </div>
                {!loading && (
                    <button
                        type="submit"
                        className="btn mt-5 w-full font-extrabold text-white btn-success"
                    >
                        বিতরণ তথ্য যুক্ত করুন
                    </button>
                )}
            </form>
            {loading && (
                <div className="fixed daeLoader">
                    <Loader />
                    <h2 className="text-green-600 mt-3 text-4xl">
                        {loadingMessage && loadingMessage}
                    </h2>
                </div>
            )}
        </section>
    );
};

export default AddDistribution;
