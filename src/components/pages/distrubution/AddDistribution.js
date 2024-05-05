import React, { useContext, useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import SectionTitle from "../../shared/SectionTitle";
import * as Yup from "yup";
import { useFormik } from "formik";
import { createDistribution, getAllProjects } from "../../../services/userServices";
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

const AddDistribution = () => {
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState(null);
    const [images, setImages] = useState([]);
    const { user } = useContext(AuthContext);
    const [selectedProject, setSelectedProject] = useState({});
    const [allProjects, setAllProjects] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        const imagesArray = files.map((file) => URL.createObjectURL(file));
        setImages((prevImages) => prevImages.concat(imagesArray));
    };

    const handleRemoveImage = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
        formik.setFieldValue("images", updatedImages);
    };

    const validationSchema = Yup.object().shape({
        projectName: Yup.string().required("প্রকল্পের নাম প্রয়োজন"),
        materialName: Yup.string().required("মাল্টিরিয়াল নাম প্রয়োজন"),
        date: Yup.date().required("তারিখ প্রয়োজন"),
        presentGuests: Yup.string().required("উপস্থিত অতিথিদের নাম প্রয়োজন"),
        comment: Yup.string().required("মন্তব্য প্রয়োজন"),
    });

    const resetForm = () => {
        formik.resetForm();
        setImages([]);
    };

    const initialValues = {
        projectName: "",
        projectShortName: "",
        fiscalYear: "",
        season: "",
        materialName: "",
        date: new Date(),
        presentGuests: "",
        images: [],
        comment: "",
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            values.images = images;
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

                    const compressedImage = await compressAndUploadImage(images[i]);
                    const result = await uploadToCloudinary(compressedImage, "distribution");
                    uploadedImageLinks.push(result);
                }
                setLoadingMessage("বিতরণের তথ্য আপ্লোড হচ্ছে");

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
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllProjects();
                if (result?.data?.success) {
                    setAllProjects(result.data.data);
                } else {
                    setAllProjects([]);
                    toast.error("প্রকল্পের তথ্য পাওয়া যায়নি");
                }
            } catch (error) {
                console.error("প্রকল্পের তথ্যের সমস্যা:", error);
                toast.error(
                    "প্রকল্পের তথ্য সার্ভার থেকে আনতে অসুবিধার সৃষ্টি হয়েছে। পুনরায় রিলোড করেন অথবা সংশ্লিষ্ট কর্তৃপক্ষকে অবহিত করুন"
                );
            }
        };

        fetchData();
    }, []);

    return (
        <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <SectionTitle title={"নতুন বিতরণ তথ্য যুক্ত করুন"} />
            <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div>
                        <label className="font-extrabold mb-1 block">
                            প্রকল্পের পুরো নাম
                        </label>
                        <select
                            className="input input-bordered w-full"
                            id="projectName"
                            name="projectName"
                            value={selectedProject?.name?.details || formik.values.projectName}
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
                        {formik.touched.projectName && formik.errors.projectName && (
                            <div className="text-red-600 font-bold">
                                {formik.errors.projectName}
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
                            id="projectShortName"
                            name="projectShortName"
                            value={selectedProject?.name?.short || ""}
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="font-extrabold mb-1 block">অর্থবছর</label>
                        <select
                            className="input input-bordered w-full"
                            id="fiscalYear"
                            name="fiscalYear"
                            value={formik.values.fiscalYear}
                            onChange={formik.handleChange}
                            defaultValue={toBengaliNumber(getFiscalYear())}
                        >
                            <FiscalYear />
                        </select>
                    </div>
                    <div>
                        <label className="font-extrabold mb-1 block">মৌসুম</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            id="season"
                            name="season"
                            value={selectedProject?.season || ""}
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="font-extrabold mb-1 block">মাল্টিরিয়াল নাম</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            id="materialName"
                            name="materialName"
                            onBlur={formik.handleBlur}
                            placeholder="মাল্টিরিয়াল নাম"
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
                            id="date"
                            name="date"
                            asSingle={true}
                            value={formik.values.date}
                            onChange={(newValue) => formik.setFieldValue("date", newValue)}
                            showShortcuts={true}
                        />
                        {formik.touched.date && formik.errors.date && (
                            <div className="text-red-600 font-bold">{formik.errors.date}</div>
                        )}
                    </div>
                    <div>
                        <label className="font-extrabold mb-1 block">
                            উপস্থিত অতিথিদের নাম
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
                </div>
                <div className="grid grid-cols-1 mt-3 mb-3 gap-4 lg:grid-cols-3">
                    <div>
                        <label className="font-extrabold mb-1 block">ছবি আপলোড করুন</label>
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
