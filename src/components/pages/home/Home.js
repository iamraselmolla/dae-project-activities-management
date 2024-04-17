import React from "react";
import Banner from "./Banner";
import Features from "./Features";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <Features key={1}></Features>
    </>
  );
};

export default Home;
