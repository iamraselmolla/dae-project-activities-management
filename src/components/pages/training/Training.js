import React, { useContext } from "react";
import SingleTraining from "./SingleTraining";
import SectionTitle from "../../shared/SectionTitle";
import AddModuleButton from "../../shared/AddModuleButton";
import NoContentFound from "../../shared/NoContentFound";
import { useSelector } from "react-redux";
import { AuthContext } from "../../AuthContext/AuthProvider";

const Training = () => {
  const { trainings: allTrainings } = useSelector((state) => state.dae);
  const { role } = useContext(AuthContext);

  return (
    <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      {role === "admin" && (
        <AddModuleButton
          btnText={"প্রশিক্ষণ যুক্ত করুন"}
          link={"addTraining"}
          key={"addTraining"}
        />
      )}
      <SectionTitle title={"সকল প্রশিক্ষণ"} />
      <div className="text-right font-extrabold"></div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6">
        {allTrainings?.length > 0 &&
          allTrainings?.map((singleTraining) => (
            <SingleTraining key={singleTraining?._id} data={singleTraining} />
          ))}
      </div>
      {allTrainings?.length < 1 && (
        <div className="flex justify-center items-center">
          <NoContentFound text={"কোনো কৃষক প্রশিক্ষণের তথ্য পাওয়া যায়নি।"} />
        </div>
      )}
    </section>
  );
};

export default Training;
