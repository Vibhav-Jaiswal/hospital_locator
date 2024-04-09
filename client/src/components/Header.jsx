import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className=" bg-slate-200">
      <div className="flex justify-between items-center max-w-5xl mx-auto p-3">
        <Link to="/">
          <h1>Hospital Locator</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/signin">Sign in</Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
