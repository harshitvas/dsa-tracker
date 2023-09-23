import React from "react";
// import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="h-16 bg-red-500 text-black flex items-center">
      <div className="w-full text-center pl-3">
        <Link to={"/"} className="text-3xl md:text-5xl font-bold">
          DSA Tracker
        </Link>
      </div>
      {/* <div className="w-1/3 md:w-full flex justify-end pr-5 items-center">
        <Link to={"/profile"}>
          <PersonIcon
            style={{ fontSize: "36px" }}
            className="rounded-full border-black border-2"
          />
        </Link>
      </div> */}
    </div>
  );
};

export default Navbar;
