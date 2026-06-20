import { useState } from "react";
import { createContext } from "react";
import { BACKEND_URL } from "../utils/constants";
import { toast } from "react-toastify";
import axios from "axios";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const [appointments, setAppointments] = useState([]);
  const [dashboardData, setDashboardData] = useState(false);
  const [profileData, setProfileData] = useState(false);

  const [doctorToken, setDoctorToken] = useState(
    localStorage.getItem("doctorToken") || "",
  );

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/doctor/appointments`,
        { headers: { doctorToken } },
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

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/doctor/complete-appointment`,
        { appointmentId },
        { headers: { doctorToken } },
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
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
        `${BACKEND_URL}/api/doctor/cancel-appointment`,
        { appointmentId },
        { headers: { doctorToken } },
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/doctor/dashboard`, {
        headers: { doctorToken },
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

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/doctor/profile`, {
        headers: { doctorToken },
      });

      if (data.success) {
        setProfileData(data.profileData);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const value = {
    doctorToken,
    setDoctorToken,
    appointments,
    setAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    dashboardData,
    setDashboardData,
    getDashboardData,
    profileData,
    setProfileData,
    getProfileData,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
