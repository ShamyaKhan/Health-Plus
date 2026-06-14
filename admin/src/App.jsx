import { useContext } from "react";
import "./App.css";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";

function App() {
  const { adminToken } = useContext(AdminContext);

  return adminToken ? (
    <div className="bg-[#f8f9fd]">
      <ToastContainer />
    </div>
  ) : (
    <>
      <ToastContainer />
      <Login />
    </>
  );
}

export default App;
