import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../utils/constants";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashboardData, setDashboardData] = useState(false);

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

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/admin/appointments`,
        { headers: { adminToken } },
      );
      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/admin/cancel-appointment`,
        { appointmentId },
        { headers: { adminToken } },
      );
      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/admin/dashboard`, {
        headers: { adminToken },
      });
      if (data.success) {
        setDashboardData(data.dashboardData);
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
    appointments,
    setAppointments,
    getAllAppointments,
    cancelAppointment,
    dashboardData,
    getDashboardData,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
