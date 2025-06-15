import React from "react";

const Loader = () => {
  return (
    <section className="dots-container flex items-center justify-center h-[calc(100vh-100px)] w-full ">
      <div className="dot" />
      <div className="dot" />
      <div className="dot" />
      <div className="dot" />
      <div className="dot" />
    </section>
  );
};

export default Loader;
