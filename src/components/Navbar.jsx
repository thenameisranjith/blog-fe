/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { logout } from "../services/apilist";

const Navbar = () => {
  const nav = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [prompt, setPrompt] = useState("");

  const userName = localStorage.getItem("username");
  console.log(">>>>> ", userName);
  const handleLogout = () => {
    logout()
      .then((res) => {
        setUser(null);
        nav("/");
        localStorage.clear();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex item-center justify-between px-6 md:px-[200px] py-4">
      <h1 className="text-lg font-extrabold">
        <Link to="/">Blog Market </Link>
      </h1>
      <div className="flex justify-center items-center space-x-0">
        <BsSearch
          className="cursor-pointer"
          onClick={() => nav(prompt ? "?search=" + prompt : nav("/"))}
        />

        <input
          className="outline-none px-3 py-1"
          type="search"
          placeholder="search a post"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>
      <div className="flex item-center justify-center space-x-2 md:space-x-4">
        {user ? (
          <>
            <h3>
              <Link to="/write">Write</Link>
            </h3>
            <h3>
              <Link to="/profile">Profile</Link>
            </h3>
            <h3>
              <Link to="#" onClick={handleLogout}>
                Logout
              </Link>
            </h3>
            <p>{userName}</p>
          </>
        ) : (
          <>
            <h3>
              <Link to="/login">Login</Link>
            </h3>
            <h3>
              <Link to="/register">Register</Link>
            </h3>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
