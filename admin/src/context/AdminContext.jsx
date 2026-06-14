import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken") || "",
  );

  const value = { adminToken, setAdminToken };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
