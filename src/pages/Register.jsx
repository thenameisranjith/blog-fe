import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../url";
import axios from "axios";

const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log(username, email, password);
    try {
      const res = await axios.post(URL + "/api/auth/register", {
        username,
        email,
        password,
      });
      console.log(res);
      navigate("/login");
    } catch (err) {
      setError(err);
    } finally {
      setUserName("");
      setEmail("");
      setPassword;
      ("");
    }
  };

  return (
    <div>
      <>
        <div className="flex items-center justify-between px-6 md:px-[200px]"></div>
        <div className="w-full flex justify-center items-center h-[70vh] ">
          <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
            <h1 className="text-xl font-bold text-left">Create an account</h1>

            <input
              className="w-full px-4 py-2 border-2 border-black outline-0"
              type="text"
              value={username}
              placeholder="Enter your username"
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              className="w-full px-4 py-2 border-2 border-black outline-0"
              type="text"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full px-4 py-2 border-2 border-black outline-0"
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              className="w-full px-4 py-2 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black "
            >
              Register
            </button>

            {error && (
              <h3 className="text-red-500 text-sm ">Something went wrong</h3>
            )}
            <div className="flex justify-center items-center space-x-3">
              <p>Already have an account?</p>
              <p className="text-gray-500 hover:text-black">
                <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Register;
