import { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAdminToken } = useContext(AdminContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(`${BACKEND_URL}/api/admin/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("adminToken", data.token);
          setAdminToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form className="min-h-[80vh] flex items-center" onSubmit={handleSubmit}>
      <div
        className="flex flex-col gap-3 m-auto items-start p-8 min-w-85 sm:min-w-96 border
                    rounded-xl text-[#5e5e5e] text-sm shadow-lg"
      >
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            required
            value={email}
            className="border border-[#dadada] rounded w-full p-2 mt-1"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            required
            value={password}
            className="border border-[#dadada] rounded w-full p-2 mt-1"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="bg-primary text-white w-full py-2 rounded-md text-base">
          Login
        </button>

        {state === "Admin" ? (
          <p>
            Doctor Login?{" "}
            <span
              onClick={() => setState("Doctor")}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span
              onClick={() => setState("Admin")}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
