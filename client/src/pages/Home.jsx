import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col text-center py-40 ">
      <h1 className="text-3xl text-center py-4 font-semibold">
        Search Hospitals near by your location
      </h1>
      <Link to="location">
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Start Searching
        </button>
      </Link>
    </div>
  );
};

export default Home;
