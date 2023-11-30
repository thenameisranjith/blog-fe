/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../url";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    const res = await axios.get(URL + "/api/auth/refetch", {
      withCredentials: true,
    });
    console.log(">>>> ", res);
    setUser(res.data);
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
