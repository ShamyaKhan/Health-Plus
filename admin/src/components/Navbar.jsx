import { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const { adminToken, setAdminToken } = useContext(AdminContext);
  const { doctorToken, setDoctorToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    adminToken && setAdminToken("");
    adminToken && localStorage.removeItem("adminToken");
    doctorToken && setDoctorToken("");
    doctorToken && localStorage.removeItem("doctorToken");
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs">
        <h2
          onClick={() => navigate("/")}
          className="w-32 lg:w-36 border text-center cursor-pointer rounded-lg text-xl"
        >
          Learn Station
        </h2>
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {adminToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        className="bg-primary text-white text-sm px-10 py-2 rounded-full"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
