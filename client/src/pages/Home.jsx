import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="flex flex-col items-center text-center py-40"
      style={{
        backgroundImage:
          "url(https://cdn.pixabay.com/photo/2024/04/10/00/46/hospital-8687007_640.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "92.2vh",
      }}
    >
      <h1 className="text-4xl text-center py-4 font-semibold uppercase">
        Search for hospitals nearby your location
      </h1>
      <Link to="location" className="w-fit">
        <button className="bg-slate-700 text-white py-3 px-10 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Start Searching
        </button>
      </Link>
    </div>
  );
};

export default Home;
