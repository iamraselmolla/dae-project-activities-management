import React, { useEffect, useState } from "react";
import AddModuleButton from "../../shared/AddModuleButton";
import { getAllMotivationalTours } from "../../../services/userServices";
import toast from "react-hot-toast";
import Loader from "../../shared/Loader";
import SingleTour from "./SingleTour";

function MotivationalTour() {
  const [allTours, setAllTours] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const result = await getAllMotivationalTours();
        if (result.status === 200) {
          setAllTours(result?.data?.data);
        }
      } catch (err) {
        toast.error("উদ্বুদ্ধকরণ  ভ্রমণ ডাটাবেইজ থেকে আনতে অসুবিধা হচ্ছে।");
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);
  return (
    <>
      <section className="mx-auto bg-white max-w-7xl px-2 sm:px-6 lg:px-8">
        <AddModuleButton
          link={"add-motivational-tour"}
          btnText={"উদ্বদ্ধরণ ভ্রমণ যুক্ত করুন"}
        />
        {!loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6">
            {allTours &&
              allTours?.length > 0 &&
              allTours?.map((single) => (
                <SingleTour key={single?._id} tour={single} />
              ))}
          </div>
        ) : (
          <>
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default MotivationalTour;
