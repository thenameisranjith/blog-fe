import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        URL + "/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      setUser(response.data);
      localStorage.setItem("username", response.data.username);
      navigate("/");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log("Login Error", error);
      setError(true);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px]"></div>
      <div className="w-full flex justify-center items-center h-[50vh] ">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left">
            Log in to your account
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              className="w-full px-4 py-2 border-2 border-black outline-0 m-1 rounded-lg "
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full px-4 py-2 border-2 border-black outline-0 m-1 rounded-lg "
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full px-4 py-2 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black m-1"
            >
              Log in
            </button>
          </form>

          {error && (
            <h3 className="text-red-500 text-sm ">Something went wrong</h3>
          )}
          <div className="flex justify-center items-center space-x-3">
            <p>New here?</p>
            <p className="text-gray-500 hover:text-black">
              <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
