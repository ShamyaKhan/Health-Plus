import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../utils/constants";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currency = "$";
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(false);

  const loadUserData = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/user/get-profile`, {
        headers: { token },
      });

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/doctor/list`);

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const value = {
    doctors,
    currency,
    token,
    setToken,
    userData,
    setUserData,
    loadUserData,
    getDoctorsData,
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserData();
    } else {
      setUserData(false);
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
