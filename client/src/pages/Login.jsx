import { useState } from "react";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <form className="min-h-[80vh] flex items-center">
      <div
        className="flex flex-col gap-3 m-auto items-start p-8 min-w-85 sm:min-w-96 border
                   rounded-xl text-zinc-600 text-sm shadow-lg"
      >
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "login"} to book appointment
        </p>
        <div className="w-full">
          <p>Full Name</p>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        <div>
          <p>Email</p>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <button>{state === "Sign Up" ? "Create Account" : "Login"}</button>
      </div>
    </form>
  );
};

export default Login;
