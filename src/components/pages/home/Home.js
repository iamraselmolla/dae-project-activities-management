import React from "react";
import Banner from "./Banner";
import Features from "./Features";
import IconBoxSection from "./IconBoxSection";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <IconBoxSection />
      <Features key={1}></Features>
    </>
  );
};

export default Home;
