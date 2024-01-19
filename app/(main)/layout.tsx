import React from "react";
import Navbar from "./_components/navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="max-w-screen-xl mx-auto">{children}</div>
    </div>
  );
};

export default layout;
