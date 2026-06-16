import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../utils/constants";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [doctors, setDoctors] = useState([]);

  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken") || "",
  );

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/admin/all-doctors`,
        {},
        { headers: { adminToken } },
      );

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/admin/change-availability`,
        { docId },
        { headers: { adminToken } },
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const value = {
    adminToken,
    setAdminToken,
    doctors,
    getAllDoctors,
    changeAvailability,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
