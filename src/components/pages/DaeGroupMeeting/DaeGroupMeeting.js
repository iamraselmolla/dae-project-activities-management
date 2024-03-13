import React from "react";
import SectionTitle from "../../shared/SectionTitle";
import SingleDaeGroupMeetings from "./SingleDaeGroupMeetings";

const DaeGroupMeeting = () => {
  return (
    <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <SectionTitle title={"সকল কৃষক গ্রুপ সভা"} />
      <div className="container px-4 md:px-0 grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-6">
        <SingleDaeGroupMeetings />
        <SingleDaeGroupMeetings />
        <SingleDaeGroupMeetings />
        <SingleDaeGroupMeetings />
        <SingleDaeGroupMeetings />
        <SingleDaeGroupMeetings />
        <SingleDaeGroupMeetings />
        <SingleDaeGroupMeetings />
        <SingleDaeGroupMeetings />
        <SingleDaeGroupMeetings />
        <SingleDaeGroupMeetings />
        <SingleDaeGroupMeetings />
        <SingleDaeGroupMeetings />
        <SingleDaeGroupMeetings />
        <SingleDaeGroupMeetings />
      </div>
    </section>
  );
};

export default DaeGroupMeeting;
