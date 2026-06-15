import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const { adminToken } = useContext(AdminContext);

  return (
    <div className="min-h-screen border-r bg-white">
      {adminToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            to={"/admin-dashboard"}
            className={({
              isActive,
            }) => `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer 
                  ${isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""}`}
          >
            <img src={assets.home_icon} />
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            to={"/all-appointments"}
            className={({
              isActive,
            }) => `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer 
                  ${isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""}`}
          >
            <img src={assets.appointment_icon} />
            <p>Appointments</p>
          </NavLink>
          <NavLink
            to={"/create-doctor"}
            className={({
              isActive,
            }) => `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer 
                  ${isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""}`}
          >
            <img src={assets.add_icon} />
            <p>Create Doctor</p>
          </NavLink>
          <NavLink
            to={"/doctors-list"}
            className={({
              isActive,
            }) => `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer 
                  ${isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""}`}
          >
            <img src={assets.people_icon} />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
